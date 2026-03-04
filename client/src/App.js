import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://ai-movie-insight-builder-1pxp.onrender.com";
  const searchMovie = async () => {
    if (!query) return;
    setLoading(true);
    setMovie(null); // Purana data clear karne ke liye
    try {
      const res = await axios.get(`http://localhost:5000/api/movie/${query}`);
      setMovie(res.data.data);
    } catch (err) {
      alert("Movie nahi mili!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1a1a1a' }}>🎬 AI Movie Critic</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Enter movie name (e.g. Inception)..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '2px solid #ddd' }}
        />
        <button onClick={searchMovie} style={{ padding: '12px 25px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Analyzing...' : 'Search'}
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center' }}>🕒 Wait, AI is reading reviews...</div>}

      {movie && (
        <div style={{ background: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '15px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', padding: '20px', gap: '20px', flexWrap: 'wrap' }}>
            <img src={movie.Poster} alt="Poster" style={{ width: '200px', borderRadius: '10px' }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{movie.Title} ({movie.Year})</h2>
              <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
              <p><strong>Cast:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
            </div>
          </div>
          {/* AI Summary Section */}
          <div style={{ backgroundColor: '#f8f9ff', padding: '20px', borderTop: '5px solid #007bff' }}>
            <h3 style={{ marginTop: 0, color: '#007bff' }}>🤖 AI Review Analysis</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333', fontStyle: 'italic' }}>
              {movie.aiSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;