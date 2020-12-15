import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ILoaderProps {
  style?: { [key: string]: any };
  loading: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ style, loading }) => {
  return (
    <View style={[styles.container, style && style]}>
      {loading && <ActivityIndicator size="large" />}
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
