import { RematchDispatch } from '@rematch/core';
import { IPokemon } from '../@types/pokemons';
import { replacedString } from '../helpers/pokemons';
import { fetchMorePokemons, fetchPokemons } from '../services/api';

interface IPokemonsState {
  loading: boolean;
  fetching: boolean;
  pokemons: IPokemon[];
  nextPage: string;
}

const pokemons = {
  state: {
    loading: false,
    fetching: false,
    pokemons: [],
    nextPage: '',
  } as IPokemonsState,

  reducers: {
    setLoadingTrue: (state: IPokemonsState) => {
      return { ...state, loading: true };
    },
    setLoadingFalse: (state: IPokemonsState) => {
      return { ...state, loading: false };
    },
    setFetchingTrue: (state: IPokemonsState) => {
      return { ...state, fetching: true };
    },
    setFetchingFalse: (state: IPokemonsState) => {
      return { ...state, fetching: false };
    },
    storePokemons: (state: IPokemonsState, payload: IPokemon[]) => {
      return { ...state, pokemons: payload, loading: false };
    },
    storeMorePokemons: (state: IPokemonsState, payload: IPokemon[]) => {
      return { ...state, pokemons: [...state.pokemons, payload], fetching: false };
    },
    setNextPage: (state: IPokemonsState, payload: string) => {
      return { ...state, nextPage: payload };
    },
  },

  effects: (dispatch: RematchDispatch) => ({
    async loadPokemons() {
      dispatch.pokemons.setLoadingTrue();

      try {
        const response = await fetchPokemons();
        dispatch.pokemons.storePokemons(response.data.results);
        dispatch.pokemons.setNextPage(replacedString(response.data.next));
      } catch (error) {
        console.error(error);
      }
    },

    async loadMorePokemons(url: string) {
      dispatch.pokemons.setFetchingTrue();

      try {
        const response = await fetchMorePokemons(url);
        dispatch.pokemons.storePokemons(response.data.results);
        dispatch.pokemons.setNextPage(replacedString(response.data.next));
      } catch (error) {
        console.error(error);
      }
    },
  }),
};

export default pokemons;
