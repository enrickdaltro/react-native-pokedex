import React from 'react';

import { Home, Pokemon } from '../pages';

import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pokemon" component={Pokemon} />
    </Stack.Navigator>
  );
};

export default Router;
