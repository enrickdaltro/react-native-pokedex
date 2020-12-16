import { capitalize } from './pokemons';
import { types } from '@babel/core';
import { IStats, IStatsResponse, ITypesResponse } from '../@types/pokemon';
import colors from '../assets/colors';

export const getNormalizedTypes = (types: ITypesResponse[]): string[] => {
  const normalizedTypes = types.reduce((acc, item) => {
    acc.push(item.type.name);
    return acc;
  }, []) as string[];
  return normalizedTypes;
};
export const getNormalizedStats = (stats: IStatsResponse[]): IStats[] => {
  const normalizedStats = stats.reduce((acc, item) => {
    acc.push({ name: item.stat.name, base_stat: item.base_stat });
    return acc;
  }, []) as IStats[];
  return normalizedStats;
};

export const getMatchingBg = (type: string): string => {
  switch (type) {
    case 'grass':
      return colors.typeGrass;
    case 'normal':
      return colors.typeNormal;
    case 'fighting':
      return colors.typeFighting;
    case 'flying':
      return colors.typeFlying;
    case 'poison':
      return colors.typePoison;
    case 'ground':
      return colors.typeGround;
    case 'rock':
      return colors.typeRock;
    case 'bug':
      return colors.typeBug;
    case 'ghost':
      return colors.typeGhost;
    case 'steel':
      return colors.typeSteel;
    case 'fire':
      return colors.typeFire;
    case 'water':
      return colors.typeWater;
    case 'electric':
      return colors.typeElectric;
    case 'ice':
      return colors.typeIce;
    case 'dragon':
      return colors.typeDragon;
    case 'fairy':
      return colors.typeFairy;
    case 'dark':
      return colors.typeDark;
    case 'water':
      return colors.typeWater;
    default:
      return 'OK';
  }
};

export const getStatName = (name: string): string => {
  if (name === 'special-attack') {
    return 'Sp. Atk';
  } else if (name === 'special-defense') {
    return 'Sp. Def';
  } else {
    return capitalize(name);
  }
};

export const getTextBaseColor = (color: string): string => {
  if (color === colors.typeNormal) {
    return colors.Black80;
  } else {
    return colors.white;
  }
};
