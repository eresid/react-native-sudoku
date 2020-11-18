/* eslint-disable no-undef */
import React, { useState, createContext } from 'react';

export const GameContext = createContext();

export const GameContextProvider = (props) => {
  const [count, setCount] = useState(0);

  toggleTheme = () => {
    setCount(count + 1);
  };

  return (
    <GameContext.Provider value={[count, setCount]}>
      {props.children}
    </GameContext.Provider>
  );
};
