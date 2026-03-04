require('dotenv').config();
const express = require('express');
const cors = require('cors');
const omdbService = require('./services/omdb.service');
const tmdbService = require('./services/tmdb.service');
const aiService = require('./services/ai.service');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/movie/:name', async (req, res) => {
    try {
        const movieName = req.params.name;
        const movieData = await omdbService.searchMovieByName(movieName);

        if (movieData.Response === "False") {
            return res.status(404).json({ success: false, message: "Movie nahi mili!" });
        }

        // Reviews aur AI Summary ka logic
        const tmdbId = await tmdbService.getTmdbIdFromImdb(movieData.imdbID);
        let reviews = [];
        let aiSummary = "No reviews available.";

        if (tmdbId) {
            reviews = await tmdbService.getMovieReviews(tmdbId);
            if (reviews.length > 0) {
                aiSummary = await aiService.summarizeReviews(reviews);
            }
        }

        res.json({ 
            success: true, 
            data: { ...movieData, aiSummary } 
        });
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));