import React from 'react';
import { func, number, string } from 'prop-types';
import GameCell from '../../GameCell/GameCell';

const unselectedCell = (initArrayValue, indexOfArray, value, cellSelected, onPress) => {
  if (value !== '0') {
    if (initArrayValue === '0') {
      return (
        <GameCell
          key={indexOfArray}
          value={value}
          sameChosenValue={cellSelected === value}
          onPress={() => onPress(indexOfArray)}
        />
      );
    } else {
      return (
        <GameCell
          key={indexOfArray}
          value={value}
          onPress={() => onPress(indexOfArray)}
        />
      );
    }
  } else {
    return (
      <GameCell key={indexOfArray} onPress={() => onPress(indexOfArray)} />
    );
  }
};

unselectedCell.propTypes = {
  initArrayValue: string,
  indexOfArray: number,
  cellSelected: string,
  value: string,
  onPress: func.isRequired,
};

export default unselectedCell;
