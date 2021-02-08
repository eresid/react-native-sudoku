import { StyleSheet } from 'react-native';

import { CellSize, Color } from '../../components';

const styles = StyleSheet.create({
  timerText: {
    color: Color.TITLE_COLOR,
    fontSize: CellSize / 1.5,
    fontWeight: 'bold',
    lineHeight: CellSize / 1.5,
    opacity: 0.7,
  },
});

export default styles;
