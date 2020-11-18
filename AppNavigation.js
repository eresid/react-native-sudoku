import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen/MainScreen';
import BoardScreen from './src/screens/BoardScreen/BoardScreen';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Board" component={BoardScreen} />
    </Stack.Navigator>
  );
}
