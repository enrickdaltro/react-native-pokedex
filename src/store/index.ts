import { init, RematchDispatch, RematchRootState } from '@rematch/core';

import pokemons from './pokemons';
import details from './details';

const models = {
  pokemons,
  details,
};

const store = init({
  models,
});

export default store;

export type RootState = RematchRootState<typeof models>;
export type RootDispatch = RematchDispatch<typeof models>;
