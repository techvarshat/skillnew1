SkillScope — Vercel deployment guide

This project is prepared for deployment to Vercel (frontend + serverless API functions).

What I changed for Vercel readiness
- Added `api/search.js` and `api/resources/[id].js` serverless endpoints (Vercel `api/` functions).
  - These proxy YouTube Data API calls and return filtered, educational results.
  - They use `process.env.YOUTUBE_API_KEY` (set in Vercel dashboard).
- Switched the default frontend `API_URL` to `''` (empty) so the app calls relative `/api/*` endpoints when deployed.
- Added the Chatbase embed snippet to `index.html` so the chat widget loads on every page.

Important notes
- Serverless functions are stateless: any view counters or reviews that require persistence should use an external DB (Firestore, Supabase, Postgres, etc). The current front-end uses localStorage as a fallback for reviews and local caching.
- The OpenRouter AI rating integration was left as a later improvement; the serverless endpoints return a placeholder rating (3) to avoid per-video AI calls and cost during initial deploy. You can add AI analysis later by calling OpenRouter inside the serverless functions and setting `OPENROUTER_KEY` in Vercel env.

Local testing (recommended before deploying)
1. Install dependencies

```powershell
cd "c:\Users\SMILE\Downloads\GOT\skillscope (1)"
npm install
```

2. Create a `.env` file in the project root with your keys (used by `vercel dev` and local testing if you need them):

```text
YOUTUBE_API_KEY=YOUR_YOUTUBE_KEY
OPENROUTER_KEY=YOUR_OPENROUTER_KEY
```

3. Run the dev server (Vite) locally:

```powershell
npm run dev
```

4. (Optional) Run Vercel locally to test serverless functions with env loaded:

```powershell
npm i -g vercel
vercel login
vercel dev
```

Production deploy (GitHub -> Vercel)
1. Create a GitHub repository and push your code:

```powershell
cd "c:\Users\SMILE\Downloads\GOT\skillscope (1)"
git init
git add .
git commit -m "Prepare project for Vercel deployment"
# create repo on GitHub (via website) and then push
git remote add origin https://github.com/<yourname>/<repo>.git
git branch -M main
git push -u origin main
```

2. Log in to Vercel (https://vercel.com) and import the repository.
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. Set Environment Variables in Vercel (Project > Settings > Environment Variables):
   - `YOUTUBE_API_KEY` = your YouTube Data API key
   - `OPENROUTER_KEY` = (optional) your OpenRouter key if you later enable per-video AI calls
   - (Optional) `VITE_API_URL` if you want to override the API root

4. Deploy. Vercel will build the frontend and deploy the `api/` folder as serverless functions.

Post-deploy checks
- Open your deployed URL (provided by Vercel). Try a search term (e.g. "javascript").
- Verify search results show educational videos and that the Chatbase widget appears.
- Use the browser console and the network tab to inspect calls to `/api/search?q=...`.

Next steps (recommended)
- Persist reviews/views in a managed database (Supabase, MongoDB Atlas, etc.) instead of localStorage.
- Add OpenRouter per-video analysis as a background job or on demand to avoid rate limits/cost.
- Add monitoring (Sentry) and logging for serverless functions.

If you want, I can:
- Add OpenRouter calls to the serverless functions and wire up `OPENROUTER_KEY` usage (note: this will increase API usage and cost).
- Add a persistent DB integration for reviews and views.

