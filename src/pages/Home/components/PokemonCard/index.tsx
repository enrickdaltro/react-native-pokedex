import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextStyle } from 'react-native';
import { IPokemon } from '../../../../@types/pokemons';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import { capitalize, getPokemonImage } from '../../../../helpers/pokemons';

interface IPokemonPropsCard {
  item: IPokemon;
}

const CARD_HEIGHT = 100;

const PokemonCard: React.FC<IPokemonPropsCard> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pokemon', { item })}>
      <Text style={styles.name}>{capitalize(item.name)}</Text>

      <View>
        <Image source={images.pokeballLarge} style={styles.pokeballLarge} />
        <Image source={getPokemonImage(item.url)} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: CARD_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 30,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.Black80,
  } as TextStyle,
  pokeballLarge: {
    tintColor: colors.textGrey,
    height: 100,
    width: 100,
    position: 'absolute',
    top: -50,
    right: -20,
    bottom: 0,
    opacity: 0.4,
  },
  pokemonImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    position: 'absolute',
    right: 10,
    top: -65,
  },
});

export default React.memo(PokemonCard);
