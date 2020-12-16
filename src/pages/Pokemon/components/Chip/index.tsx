import { types } from '@babel/core';
import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import colors from '../../../../assets/colors';
import { capitalize } from '../../../../helpers/pokemons';

interface IChip {
  types: string[];
  baseColor: string;
}

const Chip: React.FC<IChip> = ({ types, baseColor }) => {
  return (
    <>
      {types &&
        types.length > 0 &&
        types.map((item: string, index: number) => (
          <View key={`${item} + ${index}`} style={styles.chip}>
            <Text style={[styles.chipLabel, { color: baseColor }]}>{capitalize(item)}</Text>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Chip;
