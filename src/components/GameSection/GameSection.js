import React from 'react';
import { View } from 'react-native';
import { func } from 'prop-types';

import { useSudokuContext } from '../../contexts/SudokuContext';
import { selectedCell, unselectedCell } from './innerBlocks';
import styles from './GameSectionStyles';

const GameSection = ({ onPress }) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let {
    numberSelected,
    gameArray,
    fastMode,
    cellSelected,
    initArray,
  } = useSudokuContext();

  const isCellSameAsSelectedCell = (row, column) => {
    if (fastMode) {
      if (numberSelected === gameArray[row * 9 + column]) {
        return true;
      }
      return false;
    } else {
      if (cellSelected === row * 9 + column) {
        return true;
      }
      if (gameArray[cellSelected] === '0') {
        return false;
      }
      if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
        return true;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {rows.map((row) => {
          return (
            <View style={styles.stackWrapper} key={row}>
              {rows.map((column) => {
                const indexOfArray = row * 9 + column;
                const value = gameArray[indexOfArray];

                if (cellSelected === indexOfArray) {
                  return selectedCell(initArray[indexOfArray], indexOfArray, value, true, onPress)
                }

                if (fastMode) {
                  if (
                    numberSelected !== '0' &&
                    isCellSameAsSelectedCell(row, column)
                  ) {
                    return selectedCell(initArray[indexOfArray], indexOfArray, value, false, onPress);
                  } else {
                    return unselectedCell(initArray[indexOfArray], indexOfArray, value, cellSelected, onPress);
                  }
                } else {
                  if (
                    cellSelected !== -1 &&
                    isCellSameAsSelectedCell(row, column)
                  ) {
                    return selectedCell(initArray[indexOfArray], indexOfArray, value, false, onPress);
                  } else {
                    return unselectedCell(initArray[indexOfArray], indexOfArray, value, cellSelected, onPress);
                  }
                }
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

GameSection.propTypes = {
  onPress: func.isRequired,
};

export default GameSection;
