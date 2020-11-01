import {Platform, Linking, Share, Alert} from 'react-native';

import I18n from './i18n';

export const onShare = () => {
  const url = 'https://github.com/eresid/react-native-sudoku';
  let message = I18n.t('sharemessage');
  if (Platform.OS == 'android') message = message + ' \n' + url;
  Share.share(
    {
      url,
      message,
      title: I18n.t('share'),
    },
    {
      dialogTitle: I18n.t('share'),
    },
  ).catch((error) => {
    Alert.alert(I18n.t('sharefailed'));
  });
};

export const onRate = () => {
  const link =
    Platform.OS == 'android'
      ? 'https://play.google.com/store/apps/details?id=com.liteneo.sudoku'
      : 'itms-apps://itunes.apple.com/cn/app/id1138612488?mt=8';
  Alert.alert(I18n.t('rate'), I18n.t('ratemessage'), [
    {text: I18n.t('cancel')},
    {text: I18n.t('confirm'), onPress: () => Linking.openURL(link)},
  ]);
};
