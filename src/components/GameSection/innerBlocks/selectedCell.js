import React from 'react';
import { string, number, bool, func } from 'prop-types';
import GameCell from '../../GameCell/GameCell';

const selectedCell = (
  initArrayValue,
  indexOfArray,
  value,
  highlight,
  onPress
) => {
  if (value !== '0') {
    if (initArrayValue === '0') {
      return (
        <GameCell
          key={indexOfArray}
          value={value}
          highlight={highlight}
          onPress={() => onPress(indexOfArray)}
        />
      );
    } else {
      return (
        <GameCell
          key={indexOfArray}
          value={value}
          highlight={highlight}
          sameChosenValue
          onPress={() => onPress(indexOfArray)}
        />
      );
    }
  } else {
    return (
      <GameCell
        key={indexOfArray}
        highlight={highlight}
        onPress={() => onPress(indexOfArray)}
      />
    );
  }
};

selectedCell.propTypes = {
  initArrayValue: string,
  indexOfArray: number,
  value: string,
  highlight: bool,
  onPress: func.isRequired,
};

export default selectedCell;
