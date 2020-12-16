import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../assets/colors';
import images from '../../assets/images';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Image source={images.leftArrow} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    padding: 10,
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
  },
  image: {
    height: 16,
    width: 16,
    tintColor: colors.white,
  },
});

export default Header;
