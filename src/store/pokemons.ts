import { RootState } from './index';
import { RematchDispatch } from '@rematch/core';
import { IPokemon } from '../@types/pokemons';
import { replacedString } from '../helpers/pokemons';
import { fetchMorePokemons, fetchPokemons } from '../services/api';

interface IPokemonsState {
  loading: boolean;
  fetching: boolean;
  pokemons: IPokemon[];
  offset: number;
  limit: number;
}

const pokemons = {
  state: {
    loading: false,
    fetching: false,
    pokemons: [],
    offset: 0,
    limit: 20,
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
      return { ...state, pokemons: [...state.pokemons, ...payload], fetching: false };
    },
    setNextOffset: (state: IPokemonsState) => {
      return { ...state, offset: state.offset + 20 };
    },
  },

  effects: (dispatch: RematchDispatch) => ({
    async loadPokemons() {
      dispatch.pokemons.setLoadingTrue();

      try {
        const response = await fetchPokemons();
        dispatch.pokemons.storePokemons(response.data.results);
        dispatch.pokemons.setNextOffset();
      } catch (error) {
        console.error(error);
      }
    },

    async loadMorePokemons(_, state: RootState) {
      const { offset, limit } = state.pokemons;
      dispatch.pokemons.setFetchingTrue();

      try {
        const response = await fetchMorePokemons(offset, limit);
        dispatch.pokemons.storeMorePokemons(response.data.results);
        dispatch.pokemons.setNextOffset();
      } catch (error) {
        console.error(error);
      }
    },
  }),
};

export default pokemons;
