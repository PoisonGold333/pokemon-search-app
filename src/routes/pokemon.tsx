import React, { useState } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';
import { searchPokemon } from '../services/pokemonApi';
import { Pokemon } from '../types/pokemon';

export async function loader({ params }: { params: any }) {
  const { nameOrId } = params;
  
  try {
    const pokemon = await searchPokemon(nameOrId);
    return { pokemon, error: null };
  } catch (error) {
    return { pokemon: null, error: 'Pokemon no encontrado' };
  }
}

export function PokemonDetails() {
  const { pokemon, error } = useLoaderData() as { pokemon: Pokemon | null, error: string | null };
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
    <div className="pokemon-details-page">
      <div className="search-section">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca otro Pokemon..."
              className="search-input"
              disabled={loading}
              required
            />
            <button type="submit" disabled={loading || !searchTerm.trim()} className="search-button">
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>
        <Link to="/" className="back-button">← Volver</Link>
      </div>
      
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        {pokemon && <PokemonCard pokemon={pokemon} />}
      </main>
    </div>
  );
}

export { PokemonDetails as Component };