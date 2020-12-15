export const replacedString = (url: string): string => {
  return url && url.replace('https://pokeapi.co/api/v2', '');
};

export const getPokemonImage = (url: string): { [key: string]: string } => {
  const pokemonNumber =
    url && url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
  const pokemonImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber}.png`;
  return { uri: pokemonImageUrl };
};

export const capitalize = (name: string): string => {
  return name && name.charAt(0).toUpperCase() + name.slice(1);
};
