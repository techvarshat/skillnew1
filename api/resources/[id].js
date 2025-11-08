export default async function handler(req, res) {
  try {
    const id = req.query.id || (req.url && new URL(req.url, 'http://localhost').pathname.split('/').pop());
    if (!id) return res.status(400).json({ error: 'missing id' });

    const YT_KEY = process.env.YOUTUBE_API_KEY;
    if (!YT_KEY) return res.status(500).json({ error: 'YOUTUBE_API_KEY not set' });

    const params = new URLSearchParams({ part: 'snippet,statistics,contentDetails', id, key: YT_KEY });
    const resv = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`);
    if (!resv.ok) {
      const t = await resv.text();
      return res.status(502).json({ error: 'YouTube videos failed', detail: t });
    }

    const json = await resv.json();
    const items = json.items || [];
    if (!items.length) return res.status(404).json({ error: 'not found' });

    const v = items[0];
    const s = v.snippet || {};
    const stats = v.statistics || {};
    const shortSummary = `${s.description?.split('\n')[0]?.slice(0, 300) || ''}`;

    const out = {
      id: v.id,
      title: s.title || '',
      provider: 'YouTube',
      url: `https://www.youtube.com/watch?v=${v.id}`,
      rating: 3,
      views: Number(stats.viewCount || 0),
      category: 'Learning',
      thumbnail: (s.thumbnails && (s.thumbnails.high?.url || s.thumbnails.default?.url)) || '',
      summary: shortSummary,
      reviews: [],
      createdAt: s.publishedAt || new Date().toISOString()
    };

    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e && e.message || e) });
  }
}
