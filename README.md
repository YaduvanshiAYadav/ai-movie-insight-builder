# AI Movie Insight Builder 🎬✨

A full-stack movie analysis tool built for the Brew Hiring Assignment. It allows users to search for movies by Name or IMDb ID and provides AI-generated audience sentiment insights.

## 🚀 Live Demo
- **Frontend (Vercel):** https://ai-movie-insight-builder-8bel1o6al-amityadavs-projects-08b6e002.vercel.app/
- **Backend (Render):** https://ai-movie-insight-builder-1pxp.onrender.com/

## 🛠️ Tech Stack Rationale
- **Frontend:** **React (Next.js)** - Chosen for fast rendering and seamless deployment on Vercel.
- **Backend:** **Node.js & Express** - Efficient for handling API requests and middleware like CORS.
- **AI Model:** **Google Gemini 2.5 Flash** - Used to summarize audience reviews quickly and accurately.
- **Data APIs:** OMDb (Metadata) and TMDB (Reviews).

## 🌟 Key Features
- **Search by IMDb ID:** Fully compliant with the assignment's core requirement.
- **AI Sentiment Analysis:** Summarizes complex audience reviews into simple, readable insights.
- **Modern UI:** Dark-themed, responsive design with glassmorphism effects.
- **Error Handling:** Graceful handling of "Movie Not Found" or API downtime.

## ⚙️ Setup Instructions
1. Clone the repo: `git clone https://github.com/YaduvanshiAYadav/ai-movie-insight-builder.git`
2. Install dependencies for both `client` and `server`: `npm install`
3. Add your `.env` keys (GEMINI_API_KEY, OMDB_API_KEY, TMDB_API_KEY) in the `server` folder.
4. Run locally: `npm start` (client) and `node index.js` (server).

## 📌 Important Notes
- **Cold Start:** Since the backend is on Render's free tier, the first search might take **30-40 seconds** to wake up the server. Please be patient on the first request.
- **Responsive:** The UI is tested for both desktop and mobile devices.