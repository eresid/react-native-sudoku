import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  UIManager,
  View,
} from 'react-native';

import Main from './app/containers/Main';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          animated={true}
          translucent={true}
          barStyle="light-content"
        />
        <Main />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
