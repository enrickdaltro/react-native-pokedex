import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokemons = async (): Promise<any> => {
  const pokemons = await api.get('/pokemon');
  return pokemons;
};

export const fetchMorePokemons = async (url: string): Promise<any> => {
  const pokemons = await api.get(url);
  return pokemons;
};

export const fetchPokemonDetails = async (name: string): Promise<any> => {
  const pokemon = await api.get(`/pokemon/${name}`);
  return pokemon;
};
