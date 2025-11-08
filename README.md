<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SkillScope — Local Development

This repository is a self-contained front-end for discovering free learning resources. The app is independent and does not require any external AI services.

## Run locally

Prerequisites: Node.js (LTS)

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`

Open http://localhost:5173 (or the port Vite reports) in your browser.

Notes:
- Data is stored in the browser's localStorage. On first run the app seeds sample resources. Use the Resources page to add new entries or export/import the dataset.
- This project intentionally removed references to external AI platforms so it can run fully offline in the browser.
