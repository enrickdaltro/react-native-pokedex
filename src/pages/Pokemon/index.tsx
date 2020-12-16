import { RouteProp } from '@react-navigation/native';
import React, { ReactNode, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextStyle, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IPokemon } from '../../@types/pokemons';
import colors from '../../assets/colors';
import images from '../../assets/images';
import Header from '../../components/Header';
import StatsColumn from './components/StatsColumn';
import { getMatchingBg, getTextBaseColor } from '../../helpers/details';
import { capitalize, getPokemonImage } from '../../helpers/pokemons';
import { RootDispatch, RootState } from '../../store';
import { HEIGHT, WIDTH, iPhoneXLike } from '../../utils/dimensions';
import Chip from './components/Chip';

interface IPokemonProps {
  route: RouteProp<{ params: { item: IPokemon } }, 'params'>;
}

const Pokemon: React.FC<IPokemonProps> = ({ route }) => {
  const { loading, order, types, stats } = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<RootDispatch>();

  const { item } = route.params;
  const hasTypes = types && types.length > 0;
  const baseColor = getMatchingBg(types[0]);
  const textBaseColor = getTextBaseColor(baseColor);

  useEffect(() => {
    dispatch.details.loadDetails(item.name);
  }, []);

  const renderTopSection = (): ReactNode => {
    return (
      <>
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: textBaseColor }]}>{capitalize(item.name)}</Text>
          {order > 0 && <Text style={[styles.order, { color: textBaseColor }]}>{`#${order}`}</Text>}
        </View>
        <View style={styles.typesContainer}>
          <Chip types={types} baseColor={baseColor} />
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, hasTypes && { backgroundColor: baseColor }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Image source={images.pokeball} style={styles.pokeball} />
        <Header />

        {/* Top Section */}
        <View style={styles.topSection}>
          {renderTopSection()}
          <Image
            source={getPokemonImage(item.url)}
            style={[styles.pokemonImage, !iPhoneXLike && styles.pokemonImageSmall]}
          />
        </View>

        {/* Stats */}
        <StatsColumn stats={stats} loading={loading} baseColor={baseColor} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: colors.Black80,
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
  pokeball: {
    position: 'absolute',
    top: -35,
    left: 30,
    opacity: 0.1,
  },
});

export default Pokemon;
