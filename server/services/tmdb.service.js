const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

exports.getTmdbIdFromImdb = async (imdbId) => {
    try {
        const response = await axios.get(`${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`);
        const movie = response.data.movie_results[0];
        return movie ? movie.id : null;
    } catch (error) {
        console.error("TMDB Find Error:", error.message);
        return null;
    }
};

exports.getMovieReviews = async (tmdbId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${tmdbId}/reviews?api_key=${API_KEY}`);
        return response.data.results.map(r => r.content);
    } catch (error) {
        console.error("TMDB Reviews Error:", error.message);
        return [];
    }
};