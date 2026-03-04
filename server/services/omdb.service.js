const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

exports.searchMovieByName = async (title) => {
    try {
        // 's' parameter search ke liye hota hai, 't' specific title ke liye
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&t=${title}`);
        return response.data;
    } catch (error) {
        console.error("OMDb API Error:", error);
        throw new Error("Movie fetch karne mein dikkat aayi.");
    }
};