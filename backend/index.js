import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 4000;
const YT_KEY = process.env.YOUTUBE_API_KEY || process.env.YT_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_KEY || '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';

const app = express();
app.use(cors());
app.use(express.json());

async function readDB() {
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { localViews: {}, reviews: {} };
  }
}

async function writeDB(db) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

async function getAIAnalysis(title, description) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful expert at analyzing educational content. Give short, focused summaries and quality ratings.'
          },
          {
            role: 'user',
            content: `Analyze this educational video content and provide:
1. A concise 2-sentence summary
2. A quality rating from 1-5 stars based on educational value
Format: {summary: "...", rating: X}

Title: ${title}
Description: ${description}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'HTTP-Referer': 'https://skillscope.com',
          'X-Title': 'SkillScope'
        }
      }
    );

    const content = response.data.choices[0]?.message?.content || '';
    try {
      // Extract JSON from the response
      const match = content.match(/\{.*\}/s);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch (e) {
      console.error('Failed to parse AI response:', e);
    }
    
    // Fallback values if parsing fails
    return {
      summary: description.split('\n')[0]?.slice(0, 100) + '...',
      rating: 3
    };
  } catch (e) {
    console.error('OpenRouter API error:', e);
    return {
      summary: description.split('\n')[0]?.slice(0, 100) + '...',
      rating: 3
    };
  }
}

function unifiedScore(views = 0, publishedAt) {
  // Simple scoring combining popularity (views) and recency
  const now = Date.now();
  const pub = publishedAt ? new Date(publishedAt).getTime() : now;
  const days = Math.max(1, Math.floor((now - pub) / (1000 * 60 * 60 * 24)));

  // popularity score: log scale
  const pop = Math.log10(views + 1);
  // normalize pop between 0 and 1 using a heuristic (max around 1e7 views)
  const popNorm = Math.min(1, pop / 7);

  // recency score: recent => near 1, old => near 0
  const recencyNorm = 1 / (1 + days / 365); // 1 year half-life

  const score = (popNorm * 0.65 + recencyNorm * 0.35) * 100;
  return Math.round(score * 10) / 10;
}

async function fetchYouTubeVideosByQuery(query, maxResults = 20) {
  if (!YT_KEY) throw new Error('YOUTUBE_API_KEY not set in environment');
  
  // Add educational keywords to focus on tutorials and courses
  const eduQuery = `${query} (tutorial OR course OR learn OR lesson OR beginners)`;
  
  // Search with education-focused parameters
  const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
  const sres = await axios.get(searchUrl, {
    params: { 
      part: 'snippet', 
      q: eduQuery, 
      type: 'video', 
      maxResults: Math.min(maxResults * 2, 50), // fetch more to allow for filtering
      videoDuration: 'medium',  // prefer mid-length videos (tutorials)
      relevanceLanguage: 'en',  // prefer English content
      key: YT_KEY 
    }
  });
  const items = sres.data.items || [];
  const ids = items.map(i => i.id.videoId).filter(Boolean).join(',');
  if (!ids) return [];

  const detailsUrl = 'https://www.googleapis.com/youtube/v3/videos';
  const dres = await axios.get(detailsUrl, {
    params: { part: 'snippet,statistics,contentDetails', id: ids, key: YT_KEY }
  });
  const vids = dres.data.items || [];
  return vids;
}

async function normalizeYouTubeVideo(v, db) {
  const s = v.snippet || {};
  const stats = v.statistics || {};
  const id = v.id;
  const localExtra = db.localViews?.[id] || 0;
  const combinedViews = Number(stats.viewCount || 0) + Number(localExtra || 0);
  
  // Check if content is educational by looking for relevant keywords
  const title = s.title?.toLowerCase() || '';
  const desc = s.description?.toLowerCase() || '';
  const isEducational = 
    title.includes('tutorial') || title.includes('course') || 
    title.includes('learn') || title.includes('lesson') ||
    title.includes('guide') || title.includes('how to') ||
    desc.includes('learn') || desc.includes('tutorial') ||
    desc.includes('course outline') || desc.includes('curriculum');

  // Filter out non-educational content
  if (!isEducational) return null;

  // Get AI-generated summary and rating
  const analysis = await getAIAnalysis(s.title || '', s.description || '');

  return {
    id,
    title: s.title || '',
    provider: 'YouTube',
    url: `https://www.youtube.com/watch?v=${id}`,
    rating: analysis.rating,
    views: combinedViews,
    category: 'Learning',
    thumbnail: (s.thumbnails && (s.thumbnails.high?.url || s.thumbnails.default?.url)) || '',
    summary: analysis.summary,
    reviews: db.reviews?.[id] || [],
    createdAt: s.publishedAt || new Date().toISOString(),
    unifiedScore: unifiedScore(combinedViews, s.publishedAt)
  };
}

// GET /api/search?q=python&max=20
app.get('/api/search', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'missing query param q' });
    const max = Number(req.query.max) || 20;
    const db = await readDB();
    const vids = await fetchYouTubeVideosByQuery(q, max);
    const mapped = await Promise.all(
      vids
        .map(v => normalizeYouTubeVideo(v, db))
    );
    
    const filtered = mapped
      .filter(Boolean) // Remove non-educational content
      .sort((a, b) => b.views - a.views); // Sort by popularity (views)
    
    res.json(filtered.slice(0, max));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

// GET /api/resources/:id
app.get('/api/resources/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'missing id' });
    if (!YT_KEY) throw new Error('YOUTUBE_API_KEY not set');
    const dres = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: { part: 'snippet,statistics,contentDetails', id, key: YT_KEY }
    });
    const items = dres.data.items || [];
    if (!items.length) return res.status(404).json({ error: 'not found' });
    const db = await readDB();
    const out = await normalizeYouTubeVideo(items[0], db);
    if (!out) return res.status(404).json({ error: 'not an educational resource' });
    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

// POST /api/resources/:id/views  increments local view counter
app.post('/api/resources/:id/views', async (req, res) => {
  try {
    const id = req.params.id;
    const db = await readDB();
    db.localViews = db.localViews || {};
    db.localViews[id] = (db.localViews[id] || 0) + 1;
    await writeDB(db);
    res.json({ ok: true, localViews: db.localViews[id] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

// POST /api/resources/:id/reviews  body: { author, text, rating }
app.post('/api/resources/:id/reviews', async (req, res) => {
  try {
    const id = req.params.id;
    const { author, text, rating } = req.body || {};
    if (!author || !text || !rating) return res.status(400).json({ error: 'author, text, rating required' });
    const db = await readDB();
    db.reviews = db.reviews || {};
    const list = db.reviews[id] || [];
    const newReview = { id: nanoid(), author, text, rating: Number(rating), createdAt: new Date().toISOString() };
    list.push(newReview);
    db.reviews[id] = list;
    await writeDB(db);
    res.json(newReview);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true, yt_key: !!YT_KEY }));

app.listen(PORT, () => {
  console.log(`SkillScope backend listening on http://localhost:${PORT}`);
  console.log('Make sure you set YOUTUBE_API_KEY env variable before running.');
});
