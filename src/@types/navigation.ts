import { IPokemon } from './pokemons';

export type RootStackParamList = {
  Home: undefined;
  Pokemon: { item: IPokemon };
};
