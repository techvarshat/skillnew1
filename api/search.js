export default async function handler(req, res) {
  try {
    const q = (req.query.q || req.url && new URL(req.url, 'http://localhost').searchParams.get('q')) || '';
    const max = Number(req.query.max || 20);
    if (!q) return res.status(400).json({ error: 'missing query q' });

    const YT_KEY = process.env.YOUTUBE_API_KEY;
    const UDEMY_CLIENT_ID = process.env.UDEMY_CLIENT_ID;
    const UDEMY_CLIENT_SECRET = process.env.UDEMY_CLIENT_SECRET;

    if (!YT_KEY) return res.status(500).json({ error: 'YOUTUBE_API_KEY not set' });

    // Function to get Udemy access token
    async function getUdemyAccessToken() {
      if (!UDEMY_CLIENT_ID || !UDEMY_CLIENT_SECRET) return null;
      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', UDEMY_CLIENT_ID);
        params.append('client_secret', UDEMY_CLIENT_SECRET);

        const response = await fetch('https://www.udemy.com/api-2.0/oauth2/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params.toString()
        });

        if (!response.ok) return null;
        const data = await response.json();
        return data.access_token;
      } catch (e) {
        console.error('Udemy auth error:', e);
        return null;
      }
    }

    // Function to search Udemy courses
    async function searchUdemyCourses(accessToken, query, maxResults) {
      try {
        const response = await fetch(`https://www.udemy.com/api-2.0/courses/?search=${encodeURIComponent(query)}&page_size=${maxResults}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) return [];
        const data = await response.json();
        return data.results || [];
      } catch (e) {
        console.error('Udemy search error:', e);
        return [];
      }
    }

    const eduQuery = `${q} (tutorial OR course OR learn OR lesson OR beginners)`;
    const searchParams = new URLSearchParams({
      part: 'snippet',
      q: eduQuery,
      type: 'video',
      maxResults: String(Math.min(max * 2, 50)),
      videoDuration: 'medium',
      key: YT_KEY
    });

    const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`);
    if (!searchRes.ok) {
      const t = await searchRes.text();
      return res.status(502).json({ error: 'YouTube search failed', detail: t });
    }

    const sjson = await searchRes.json();
    const ids = (sjson.items || []).map(i => i.id?.videoId).filter(Boolean).join(',');
    if (!ids) return res.json([]);

    const detailsParams = new URLSearchParams({ part: 'snippet,statistics,contentDetails', id: ids, key: YT_KEY });
    const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?${detailsParams.toString()}`);
    if (!detailsRes.ok) {
      const t = await detailsRes.text();
      return res.status(502).json({ error: 'YouTube videos failed', detail: t });
    }

    const djson = await detailsRes.json();
    const ytItems = djson.items || [];

    // Get Udemy courses
    let udemyCourses = [];
    const udemyToken = await getUdemyAccessToken();
    if (udemyToken) {
      udemyCourses = await searchUdemyCourses(udemyToken, q, Math.min(max, 10));
    }

    // helper to test educational keywords
    const isEducational = (title = '', desc = '') => {
      const a = `${title} ${desc}`.toLowerCase();
      return ['tutorial', 'course', 'learn', 'lesson', 'guide', 'how to', 'curriculum', 'course outline', 'beginner'].some(k => a.includes(k));
    };

    // Prepare YouTube educational results
    let ytResults = ytItems.map(v => {
      const s = v.snippet || {};
      const stats = v.statistics || {};
      const id = v.id;
      if (!isEducational(s.title || '', s.description || '')) return null;
      return {
        id,
        title: s.title || '',
        provider: 'YouTube',
        url: `https://www.youtube.com/watch?v=${id}`,
        views: Number(stats.viewCount || 0),
        category: 'Learning',
        thumbnail: (s.thumbnails && (s.thumbnails.high?.url || s.thumbnails.default?.url)) || '',
        summary: s.description?.split('\n')[0]?.slice(0, 140) || '',
        reviews: [],
        createdAt: s.publishedAt || new Date().toISOString()
      };
    }).filter(Boolean);

    // Prepare Udemy results
    let udemyResults = udemyCourses.map(course => ({
      id: String(course.id),
      title: course.title || '',
      provider: 'Udemy',
      url: course.url || `https://www.udemy.com/course/${course.url}`,
      views: Number(course.num_subscribers || 0),
      category: 'Learning',
      thumbnail: course.image_480x270 || course.image_125_H || '',
      summary: course.headline?.slice(0, 140) || '',
      reviews: [],
      createdAt: course.created || new Date().toISOString()
    }));

    // Combine and sort results
    let results = [...ytResults, ...udemyResults].sort((a,b) => b.views - a.views).slice(0, max);

    // Call OpenRouter for AI summary/rating
    const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
    async function getAIAnalysis(title, description) {
      if (!OPENROUTER_KEY) return { summary: description?.slice(0, 140) || '', rating: 3 };
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://skillscope11.vercel.app',
            'X-Title': 'SkillScope'
          },
          body: JSON.stringify({
            model: 'mistralai/mistral-7b-instruct',
            messages: [
              { role: 'system', content: 'You are a helpful expert at analyzing educational content. Give short, focused summaries and quality ratings.' },
              { role: 'user', content: `Analyze this educational video content and provide:\n1. A concise 2-sentence summary\n2. A quality rating from 1-5 stars based on educational value\nFormat: {summary: "...", rating: X}\n\nTitle: ${title}\nDescription: ${description}` }
            ]
          })
        });
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';
        // Try to extract JSON
        const match = content.match(/\{.*\}/s);
        if (match) {
          return JSON.parse(match[0]);
        }
        // fallback
        return { summary: content.slice(0, 140), rating: 3 };
      } catch (e) {
        console.error('OpenRouter error:', e);
        return { summary: description?.slice(0, 140) || '', rating: 3 };
      }
    }

    // Batch AI calls (limit concurrency)
    const batchSize = 5;
    for (let i = 0; i < results.length; i += batchSize) {
      await Promise.all(results.slice(i, i + batchSize).map(async (item, idx) => {
        const ai = await getAIAnalysis(item.title, item.summary);
        item.summary = ai.summary;
        item.rating = ai.rating;
      }));
    }

    return res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e && e.message || e) });
  }
}
