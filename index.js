import React from 'react';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { GameContextProvider } from './src/contexts/GameContext';

class InitialComponent extends React.Component {
  render() {
    return (
      <GameContextProvider>
        <App />
      </GameContextProvider>
    );
  }
}

AppRegistry.registerComponent(appName, () => InitialComponent);
