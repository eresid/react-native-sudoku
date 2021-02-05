import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { object } from 'prop-types';

import styles from './StatisticStyles';
import I18n from '../../utils/i18n';

const StatisticScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Text style={styles.title}>{I18n.t('name')}</Text>
    </View>
  );
};

StatisticScreen.propTypes = {
  navigation: object.isRequired,
};

export default StatisticScreen;