import React, {useState} from 'react';
import {number, func} from 'prop-types';

import {LayoutAnimation, Animated, Text, TouchableOpacity} from 'react-native';

import styles from './CellStyles';

const Cell = (index, initNumber, onPress) => {
  const [number, setNumber] = useState(initNumber);
  const [hints, setHints] = useState([]);
  const [editing, setEditing] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [anim, setAnim] = useState(new Animated.Value(0));

  const updateNumber = (number, fixed) => {
    if (!fixed) LayoutAnimation.easeInEaseOut();

    setNumber(number);
    setFixed(fixed);
    setEditing(false);
  };

  const setHintNumber = (number) => {
    let hints = this.state.hints;
    if (hints.length == 6) hints.shift();
    if (hints.includes(number)) hints = hints.filter((x) => x != number);
    else hints.push(number);
    this.setState({
      hints,
      editing: true,
    });
  };

  const reset = () => {
    setNumber(initNumber);
    setHints([]);
    setEditing(false);
    setHighlight(false);
    setFixed(false);
    setToggle(false);
    setAnim(new Animated.Value(0));
  };

  const animate = () => {
    if (toggle) return;

    setToggle(true);

    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      //useNativeDriver: true,
    }).start(() => {
      setToggle(false);
    });
  };

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const scale = anim.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [1, 1.1, 1.1, 1],
  });
  const transform = [{rotate}, {scale}];
  const zIndex = toggle ? 100 : 0;
  const filled = typeof number == 'number';
  const text = filled ? number + 1 : '';
  const hint = hints.map((x) => x + 1).join('');

  return (
    <Animated.View
      style={[
        styles.cell,
        filled && styles.filledCell,
        fixed && styles.fixedCell,
        highlight && styles.highlightCell,
        {transform, zIndex},
      ]}>
      {editing ? (
        <Text style={[styles.text, styles.editingText]}>{hint}</Text>
      ) : (
        <Text
          style={[
            styles.text,
            fixed && styles.fixedText,
            highlight && styles.highlightText,
          ]}>
          {text}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={fixed ? 1 : 0.8}
        onPress={() => onPress(index, number, fixed)}
        style={styles.handle}
      />
    </Animated.View>
  );
};

Cell.propTypes = {
  index: number.isRequired,
  initNumber: number,
  onPress: func.isRequired,
};

export default Cell;
