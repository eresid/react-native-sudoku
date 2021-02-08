import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { MainStack } from './src/navigation/AppNavigation';

const Stack = createStackNavigator();

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            initialRouteName: 'MainStack',
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainStack" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
