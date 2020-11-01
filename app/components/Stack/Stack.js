import React from 'react';
import {View} from 'react-native';

import {func} from 'prop-types';

import styles from './StackStyles';
import StackCell from '../StackCell/StackCell';

const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Stack = (onPress) => {
  const stacks = stack.map((x) => new Array(9));

  return (
    <View style={styles.container}>
      {stack.map((item, i) => {
        return stack.map((item, j) => {
          return (
            <StackCell
              ref={(ref) => (stacks[j][i] = ref)}
              key={i + '-' + j}
              index={i}
              number={item}
              onPress={onPress}
            />
          );
        });
      })}
    </View>
  );
};

Stack.propTypes = {
  onPress: func.isRequired,
};

export default Stack;
