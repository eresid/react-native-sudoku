import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  UIManager,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/screens/Main';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

//const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="transparent"
            animated={true}
            translucent={true}
            barStyle="light-content"
          />
          <Main />
        </View>
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
