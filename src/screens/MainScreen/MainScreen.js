import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { object } from 'prop-types';

import styles from './MainScreenStyles';
import AppButton from '../../components/AppButton/AppButton';
import I18n from '../../utils/i18n';
import { Color } from '../../components';

const MainScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Text style={styles.title}>{I18n.t('name')}</Text>
      <AppButton onPress={() => navigate('Board')} text={I18n.t('newgame')} />
      <AppButton
        onPress={() => navigate('Main')}
        textColor={Color.TITLE_COLOR}
        bgColor={Color.COLOR_WHITE}
        text={I18n.t('nowToPlay')}
      />
    </View>
  );
};

MainScreen.propTypes = {
  navigation: object.isRequired,
};

export default MainScreen;
