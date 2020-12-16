import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/colors';

interface IEmptyState {
  label: string;
  description: string;
  onPress: () => void;
}

const EmptyState: React.FC<IEmptyState> = ({ label, description, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  } as TextStyle,
  description: {
    fontSize: 16,
    color: colors.darkGrey,
    marginBottom: 10,
  } as TextStyle,
  button: {
    width: 150,
    padding: 10,
    backgroundColor: colors.Black80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonLabel: {
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  } as TextStyle,
});

export default EmptyState;
