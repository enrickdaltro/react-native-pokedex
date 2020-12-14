import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
