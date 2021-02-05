import React from 'react';
import { View } from 'react-native';
import { func } from 'prop-types';

import NumberCell from '../NumberCell/NumberCell';
import styles from './NumberStackStyles';

const stack = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberStack = ({ onPress }) => {
  return (
    <View style={styles.container}>
      {stack.map((item) => {
        return <NumberCell key={item + 'numberStack'} value={item} onPress={() => onPress(item)} />;
      })}
    </View>
  );
};

NumberStack.propTypes = {
  onPress: func.isRequired,
};

export default NumberStack;
