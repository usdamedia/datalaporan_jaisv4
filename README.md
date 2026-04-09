<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# KEPERLUAN DATA LAPORAN TAHUNAN JAIS 2025

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4a897dfd-f561-4b97-af56-bdeb504665ef

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app with live reload:
   `npm run dev`

This project uses Vite, so `npm run dev` already gives you a live preview with hot reload in the browser.

If you want a workflow that feels closer to AI Studio preview, run:
`npm run dev:live`

That starts the dev server, exposes it on your local network, and opens the browser automatically.

## Preview Modes

- `npm run dev`
  Starts the local Vite development server with live reload.
- `npm run dev:live`
  Starts live preview and opens the app automatically.
- `npm run preview`
  Serves the production build for a final pre-deploy check.
