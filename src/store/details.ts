import { RootDispatch } from '.';
import { IStats } from '../@types/pokemon';
import { getNormalizedStats, getNormalizedTypes } from '../helpers/pokemon';
import { fetchPokemonDetails } from '../services/api';

interface IDetailsState {
  loading: boolean;
  order: number | null;
  types: string[];
  stats: IStats[];
}

const details = {
  state: {
    loading: false,
    order: null,
    types: [],
    stats: [],
  } as IDetailsState,

  reducers: {
    setLoadingTrue: (state: IDetailsState) => {
      return { ...state, loading: true };
    },
    setLoadingFalse: (state: IDetailsState) => {
      return { ...state, loading: false };
    },
    setOrder: (state: IDetailsState, order: number) => {
      return { ...state, order };
    },
    setTypes: (state: IDetailsState, payload: string[]) => {
      return { ...state, types: payload };
    },
    setStats: (state: IDetailsState, payload: IStats[]) => {
      return { ...state, stats: payload };
    },
  },

  effects: (dispatch: RootDispatch) => ({
    async loadDetails(name: string) {
      dispatch.details.setLoadingTrue();

      try {
        const response = await fetchPokemonDetails(name);
        const normalizedTypes = getNormalizedTypes(response.data.types);
        const normalizedStats = getNormalizedStats(response.data.stats);

        dispatch.details.setOrder(response.data.order);
        dispatch.details.setTypes(normalizedTypes);
        dispatch.details.setStats(normalizedStats);
        dispatch.details.setLoadingFalse();
      } catch (error) {
        console.error(error);
      }
    },
  }),
};

export default details;