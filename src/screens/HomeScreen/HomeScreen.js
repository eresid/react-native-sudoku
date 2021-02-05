import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { object } from 'prop-types';

import styles from './HomeScreenStyles';
import AppButton from '../../components/AppButton/AppButton';
import I18n from '../../utils/i18n';
import { Color } from '../../components';

const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.titleWrapper}>
        <View
          style={[
            styles.line,
            styles.lineHorizontal,
            styles.lineHorizontalLeft,
          ]}
        />
        <View
          style={[
            styles.line,
            styles.lineHorizontal,
            styles.lineHorizontalRight,
          ]}
        />
        <View
          style={[styles.line, styles.lineVertical, styles.lineVerticalLeft]}
        />
        <View
          style={[styles.line, styles.lineVertical, styles.lineVerticalRight]}
        />
        <Text style={styles.title}>{I18n.t('name')}</Text>
      </View>
      <AppButton onPress={() => navigate('Game')} text={I18n.t('newgame')} />
      <AppButton
        onPress={() => navigate('Board')}
        textColor={Color.TITLE_COLOR}
        bgColor={Color.COLOR_WHITE}
        text={I18n.t('nowToPlay')}
      />
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: object.isRequired,
};

export default HomeScreen;
