import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';
import { SearchForm } from '../components/SearchForm';
import { searchPokemon } from '../services/pokemonApi';
import { Pokemon } from '../types/pokemon';

export const PokemonDetails: React.FC = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchPokemon(query);
      setPokemon(result);
    } catch (err) {
      setError('No se encontró el Pokemon');
      setPokemon(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (nameOrId) {
      handleSearch(nameOrId);
    }
  }, [nameOrId]);

  return (
    <div className="pokemon-details-page">
      <div className="search-section">
        <SearchForm onSearch={handleSearch} isLoading={loading} />
        <Link to="/" className="back-button">← Volver</Link>
      </div>
      
      <main className="App-main">
        {loading && <div className="loading">Cargando...</div>}
        {error && <div className="error-message">{error}</div>}
        {pokemon && <PokemonCard pokemon={pokemon} />}
      </main>
    </div>
  );
};