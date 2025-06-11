import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      navigate(`/pokemon/${searchTerm.toLowerCase().trim()}`);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <header className="App-header">
        <h1>🔍 Buscador de Pokemon</h1>
        <p>Encuentra tu Pokemon favorito</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca un Pokemon..."
              className="search-input"
              disabled={loading}
              required
            />
            <button type="submit" disabled={loading || !searchTerm.trim()} className="search-button">
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>
      </header>
      
      <div className="welcome-section">
        <div className="instructions">
          <h3>Instrucciones</h3>
          <ul>
            <li>Busca por nombre: pikachu, charizard, etc.</li>
            <li>Busca por número: 1, 25, 150, etc.</li>
            <li>Haz clic en el botón de sonido para escuchar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}