import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../assets/colors';

interface ILoaderProps {
  style?: { [key: string]: any };
  loading: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ style, loading }) => {
  return (
    <View style={[styles.container, style && style]}>
      {loading && (
        <ActivityIndicator size="large" color={colors.Black80} style={{ marginBottom: 40 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
