import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextStyle, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IPokemon } from '../../@types/pokemons';
import colors from '../../assets/colors';
import images from '../../assets/images';
import Loader from '../../components/Loader';
import PokemonCard from './components/PokemonCard';
import { RootDispatch, RootState } from '../../store';
import EmptyState from '../../components/EmptyState';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const { loading, fetching, pokemons } = useSelector((state: RootState) => state.pokemons);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch.pokemons.loadPokemons();
  }, []);

  const fetchMorePokemons = useCallback(() => {
    if (!fetching) {
      dispatch.pokemons.loadMorePokemons();
    }
  }, []);

  const renderRow = (item: IPokemon): ReactElement => <PokemonCard item={item} />;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.textContainer}>
          <Image source={images.pokeball} style={styles.pokeball} />
          <Text style={styles.title}>Pokédex</Text>
          <Text style={styles.subTitle}>
            Your favorite pokemon data right on the palm of your hand!
          </Text>
        </View>

        {/* List */}
        <Loader style={styles.loader} loading={loading} />
        {!loading && (
          <FlatList
            data={pokemons}
            keyExtractor={(item, index) => ` ${item.name} + ${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderRow(item)}
            contentContainerStyle={styles.listContainerStyle}
            onEndReached={fetchMorePokemons}
            onEndReachedThreshold={0.01}
            ListFooterComponent={<Loader loading={fetching} />}
            ListEmptyComponent={
              <EmptyState
                label="No Pokemons"
                description="Sorry, we couldn't find pokemons. Try again later"
              />
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  pokeball: {
    position: 'absolute',
    top: -100,
    opacity: 0.4,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  } as TextStyle,
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.textGrey,
  } as TextStyle,
  listContainerStyle: {
    paddingBottom: 120,
    paddingVertical: 20,
  },
  loader: { marginTop: 20 },
});

export default Home;
