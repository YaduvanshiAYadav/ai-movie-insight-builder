import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  // 1. searchType define karna zaroori hai
  const [searchType, setSearchType] = useState('s'); 

  // 2. Render wala URL
  const API_BASE_URL = "https://ai-movie-insight-builder-1pxp.onrender.com";

  const searchMovie = async () => {
    if (!query) return;
    setLoading(true);
    setMovie(null);
    try {
      // 3. Yahan API_BASE_URL aur searchType dono use ho rahe hain
      // Dhyaan dena yahan ` (backtick) use hua hai
      const res = await axios.get(`${API_BASE_URL}/api/movie?query=${query}&type=${searchType}`);
      setMovie(res.data.data);
    } catch (err) {
      alert("Movie nahi mili ya server jag raha hai! Dobara try karein.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#00f2fe' }}>🎬 AI Movie Insight Builder</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        {/* Dropdown for Selection */}
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', border: '1px solid #444' }}
        >
          <option value="s">By Name</option>
          <option value="i">By IMDb ID</option>
        </select>

        <input 
          type="text" 
          placeholder={searchType === 's' ? "Enter movie name..." : "Enter IMDb ID (tt...)"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1e1e1e', color: 'white' }}
        />
        <button onClick={searchMovie} style={{ padding: '12px 25px', backgroundColor: '#00f2fe', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Analyzing...' : 'Search'}
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', color: '#00f2fe' }}>🕒 AI is reading reviews... Please wait.</div>}

      {movie && (
        <div style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', padding: '20px', gap: '20px', flexWrap: 'wrap' }}>
            <img src={movie.Poster} alt="Poster" style={{ width: '200px', borderRadius: '10px' }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{movie.Title} ({movie.Year})</h2>
              <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>
              <p><strong>Cast:</strong> {movie.Actors}</p>
              <p><strong>Plot:</strong> {movie.Plot}</p>
            </div>
          </div>
          
          {/* AI Section */}
          <div style={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', padding: '20px', borderTop: '3px solid #00f2fe' }}>
            <h3 style={{ marginTop: 0, color: '#00f2fe' }}>✨ AI Audience Sentiment</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'italic' }}>
              {movie.aiSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;