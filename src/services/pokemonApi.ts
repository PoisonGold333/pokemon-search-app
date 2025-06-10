import axios from 'axios';
import { Pokemon } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Pokemon by name');
    }
};

export const fetchPokemonById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Pokemon by ID');
    }
};

export const searchPokemon = async (query: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
  
  if (!response.ok) {
    throw new Error('Pokemon no encontrado');
  }
  
  return response.json();
};