import { RouteProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextStyle, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IPokemon } from '../../@types/pokemons';
import colors from '../../assets/colors';
import images from '../../assets/images';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import StatsColumn from '../../components/StatsColumn';
import { getMatchingBg, getTextBaseColor } from '../../helpers/pokemon';
import { capitalize, getPokemonImage } from '../../helpers/pokemons';
import { RootDispatch, RootState } from '../../store';
import { HEIGHT, WIDTH, iPhoneXLike } from '../../utils/dimensions';

interface IPokemonProps {
  route: RouteProp<{ params: { item: IPokemon } }, 'params'>;
}

const Pokemon: React.FC<IPokemonProps> = ({ route }) => {
  const { item } = route.params;

  const { loading, order, types, stats } = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<RootDispatch>();

  const hasTypes = types && types.length > 0;
  const baseColor = getMatchingBg(types[0]);
  const textBaseColor = getTextBaseColor(baseColor);

  useEffect(() => {
    dispatch.details.loadDetails(item.name);
  }, []);
  return (
    <View style={[styles.container, hasTypes && { backgroundColor: baseColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <Image source={images.pokeball} style={styles.pokeball} />
        <Header />
        <View style={styles.topSection}>
          <View style={styles.infoContainer}>
            <Text style={[styles.name, { color: textBaseColor }]}>{capitalize(item.name)}</Text>
            {!loading && (
              <Text style={[styles.order, { color: textBaseColor }]}>{`#${order}`}</Text>
            )}
          </View>
          <View style={styles.typesContainer}>
            {!loading &&
              types.length > 0 &&
              types.map((item: string, index: number) => (
                <View key={`${item} + ${index}`} style={styles.chip}>
                  <Text style={[styles.chipLabel, { color: baseColor }]}>{capitalize(item)}</Text>
                </View>
              ))}
          </View>

          <Image
            source={getPokemonImage(item.url)}
            style={[styles.pokemonImage, !iPhoneXLike && styles.pokemonImageSmall]}
          />
        </View>
        <StatsColumn stats={stats} loading={loading} baseColor={baseColor} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  safeArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    height: HEIGHT * 0.3,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.white,
    alignSelf: 'flex-start',
    marginStart: 20,
  } as TextStyle,
  order: {
    fontSize: 22,
    fontWeight: '500',
    marginRight: 20,
    color: colors.white,
  } as TextStyle,
  pokemonImage: {
    height: 220,
    width: 220,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -40,
    left: WIDTH / 4,
  },
  pokemonImageSmall: {
    height: 170,
    width: 170,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: -50,
    left: WIDTH / 4,
  },
  bottomSection: {
    backgroundColor: colors.white,
    height: HEIGHT * 0.6,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    marginStart: 20,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginRight: 10,
    borderRadius: 15,
    opacity: 0.8,
  },
  chipLabel: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontWeight: '500',
    color: colors.white,
  } as TextStyle,
  pokeball: {
    position: 'absolute',
    top: -35,
    left: 30,
    opacity: 0.1,
  },
});

export default Pokemon;
