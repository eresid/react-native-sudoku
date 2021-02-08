import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { bool, func, number, string } from 'prop-types';

import styles from './GameCellStyles';

const GameCell = ({ key, value, highlight, sameChosenValue, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.cell,
          highlight && styles.filledCell,
          sameChosenValue && styles.fixedCell,
        ]}
        key={key+value}
      >
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

GameCell.propTypes = {
  
};
GameCell.propTypes = {
  key: number,
  value: string,
  highlight: bool,
  sameChosenValue: bool,
  onPress: func.isRequired,
};

GameCell.defaultProps = {
  key: 0,
  value: null,
  highlight: false,
  sameChosenValue: false,
};

export default GameCell;
