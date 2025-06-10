import React from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const playSound = () => {
    try {
      const audio = new Audio(`https://pokemoncries.com/cries/${pokemon.id}.mp3`);
      audio.play().catch(() => {
        makeSimpleSound(pokemon);
      });
    } catch (error) {
      makeSimpleSound(pokemon);
    }
  };

  const makeSimpleSound = (pokemon: Pokemon) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let frequency = 200 + (pokemon.id * 2);
    const pokemonType = pokemon.types[0].type.name;
    
    if (pokemonType === 'fire') {
      frequency = frequency + 200;
      oscillator.type = 'sawtooth';
    } else if (pokemonType === 'water') {
      frequency = frequency - 50;
      oscillator.type = 'sine';
    } else if (pokemonType === 'electric') {
      frequency = frequency + 300;
      oscillator.type = 'square';
    } else if (pokemonType === 'grass') {
      frequency = frequency + 50;
      oscillator.type = 'triangle';
    } else if (pokemonType === 'psychic') {
      frequency = frequency + 150;
      oscillator.type = 'sine';
    } else {
      oscillator.type = 'sine';
    }
    
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
      </div>
      
      <div className="pokemon-image">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
        />
      </div>
      
      <div className="pokemon-info">
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type type-${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
        
        <div className="pokemon-stats">
          <div className="stat">
            <strong>Altura:</strong> {pokemon.height / 10} m
          </div>
          <div className="stat">
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </div>
        </div>
        
        <div className="pokemon-abilities">
          <strong>Habilidades:</strong>
          {pokemon.abilities.map((ability, index) => (
            <span key={index} className="ability">
              {ability.ability.name}
            </span>
          ))}
        </div>
        
        <button onClick={playSound} className="sound-button">
          🔊 Reproducir Sonido
        </button>
      </div>
    </div>
  );
};