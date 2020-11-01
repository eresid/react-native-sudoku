import React from 'react';
import {View} from 'react-native';
import {func} from 'prop-types';

import styles from './GridStyles';
import Cell from '../Cell/Cell';

const stack = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Grid = (onPress) => {
  const cells = [];

  return (
    <View style={styles.container}>
      {stack.map((item, i) => {
        return (
          <View key={'grid' + i} style={styles.grid}>
            {stack.map((item, j) => {
              const x = (i % 3) * 3 + (j % 3);
              const y = Math.floor(i / 3) * 3 + Math.floor(j / 3);
              const index = x + y * 9;
              return (
                <Cell
                  ref={(ref) => (cells[index] = ref)}
                  key={'cell' + index}
                  index={index}
                  initNumber={null}
                  onPress={onPress}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

Grid.propTypes = {
  onPress: func.isRequired,
};

export default Grid;
