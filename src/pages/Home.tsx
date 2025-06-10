import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setLoading(true);
    navigate(`/pokemon/${query.toLowerCase()}`);
    setLoading(false);
  };

  return (
    <div className="home-page">
      <header className="App-header">
        <h1>🔍 Buscador de Pokemon</h1>
        <p>Encuentra tu Pokemon favorito</p>
        <SearchForm onSearch={handleSearch} isLoading={loading} />
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
};