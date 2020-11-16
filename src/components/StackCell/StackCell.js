/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { LayoutAnimation, View, Text, TouchableOpacity } from 'react-native';

import styles from './StackCellStyles';
import { CellSize, BoardWidth, BorderWidth } from '../GlobalStyle';
import { number, func } from 'prop-types';

const spring = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.6,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

const Offset = (BoardWidth - CellSize * 9 - BorderWidth * 8) / 2;

const StackCell = ({ index, number, onPress }) => {
  const initLeft = (BoardWidth / 9) * number + (BoardWidth / 9 - CellSize) / 2;
  const initTop = index;

  const [hide, setHide] = useState(false);
  const [left, setLeft] = useState(initLeft);
  const [top, setTop] = useState(initTop);

  const moveTo = (index, onMoveFinish) => {
    const x = index % 9;
    const y = (index - x) / 9;
    const gap = BorderWidth * 2;
    const left = CellSize * x + gap * (Math.floor(x / 3) + 1) + Offset;
    const top = -20 - CellSize * (9 - y) - gap * (Math.floor((8 - y) / 3) + 1);
    LayoutAnimation.configureNext(spring);

    setLeft(left);
    setTop(top);

    setTimeout(() => {
      onMoveFinish && onMoveFinish();
    }, 300);
  };

  useEffect(() => {
    if (hide) {
      onFinish();
    }
  }, [hide]);

  const moveBack = (onMoveFinish) => {
    LayoutAnimation.configureNext(spring);

    setLeft(initLeft);
    setTop(initTop);

    setTimeout(() => {
      onMoveFinish && onMoveFinish();
    }, 300);
  };

  const reset = () => {
    setHide(false);
    setLeft(initLeft);
    setTop(initTop);
  };

  if (hide) return null;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(number);
      }}
      activeOpacity={0.8}
      style={[styles.container, { top, left }]}
    >
      <View style={styles.cell}>
        <Text style={styles.text}>{number + 1}</Text>
      </View>
    </TouchableOpacity>
  );
};

StackCell.propTypes = {
  index: number.isRequired,
  number: number.isRequired,
  onPress: func.isRequired,
};

export default StackCell;
