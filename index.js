import React from 'react';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
// import { GameContextProvider } from './src/contexts/GameContext';
import { SudokuProvider } from './src/contexts/SudokuContext';

class InitialComponent extends React.Component {
  render() {
    return (
      <SudokuProvider>
        <App />
      </SudokuProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => InitialComponent);
