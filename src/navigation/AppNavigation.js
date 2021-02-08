import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TabMainNavigation } from './TabMainNavigation';
import GameScreen from '../screens/GameScreen/GameScreen';
import BoardScreen from '../screens/BoardScreen/BoardScreen';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="TabMainNavigation"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabMainNavigation" component={TabMainNavigation} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Board" component={BoardScreen} />
    </Stack.Navigator>
  );
}
