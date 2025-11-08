SkillScope backend (YouTube)

This lightweight Express backend fetches YouTube search results, normalizes them, and exposes a simple API the SkillScope frontend can call.

Prerequisites
- Node 18+ (or any Node with fetch/axios support)
- A YouTube Data API v3 key

Install

> cd backend
> npm install

Run (dev)

On Windows PowerShell:

```powershell
$env:YOUTUBE_API_KEY = "YOUR_KEY_HERE"
npm run dev
```

Or set the environment variable in your shell and run `npm start`.

Endpoints
- GET /api/search?q=react&max=20  — search YouTube and return normalized Resource objects (sorted by unified score)
- GET /api/resources/:id  — fetch a single resource with merged local data
- POST /api/resources/:id/views  — increment local view counter for a resource
- POST /api/resources/:id/reviews  — add a review (body: { author, text, rating })
- GET /api/health  — basic health check

Notes
- The server stores local views and reviews in `db.json` in the backend folder.
- The unified score is a heuristic combining views and recency; you can extend it to include ratings and other signals.
- For production, consider using a proper database and securing the endpoints (API keys / auth).
