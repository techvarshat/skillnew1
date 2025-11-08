export default function handler(req, res) {
  const ok = !!process.env.YOUTUBE_API_KEY;
  res.status(200).json({ ok: true, yt_key_set: ok });
}
