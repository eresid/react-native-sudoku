import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { func, string } from 'prop-types';

import styles from './AppButtonStyles';
import { Color } from '../GlobalStyle';

const AppButton = ({ onPress, bgColor, textColor, text }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: bgColor || Color.THEME_COLOR,
      }}
    >
      <Text style={{ ...styles.text, color: textColor || Color.COLOR_WHITE }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

AppButton.propTypes = {
  onPress: func.isRequired,
  bgColor: string,
  textColor: string,
  text: string.isRequired,
};

AppButton.defaultProps = {
  bgColor: '',
  textColor: '',
};

export default AppButton;
