import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { func, number } from 'prop-types';

import styles from './NumberCellStyles';

const NumberCell = ({ value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cell} >
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

NumberCell.propTypes = {
  value: number,
  onPress: func.isRequired,
};

NumberCell.defaultProps = {
  value: 0,
};

export default NumberCell;
