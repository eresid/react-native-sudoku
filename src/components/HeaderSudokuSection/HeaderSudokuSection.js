import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import Timer from '../Timer/Timer';
import arrowBackUrl from '../../images/arrow_back.png';
import I18n from '../../utils/i18n';
import styles from './HeaderSudokuSectionStyles';

const HeaderSudokuSection = ({ onGoBack, onNewGame }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backIcon}
        activeOpacity={1}
        onPress={onGoBack}
      >
        <Image source={arrowBackUrl} />
      </TouchableOpacity>
      <Timer />
      <TouchableOpacity onPress={onNewGame}>
        <Text style={styles.title}>{I18n.t('newGame')}</Text>
      </TouchableOpacity>
    </View>
  );
};

HeaderSudokuSection.propTypes = {
  onGoBack: func.isRequired,
  onNewGame: func.isRequired,
};

export default HeaderSudokuSection;
