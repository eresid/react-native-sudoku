import { StyleSheet } from 'react-native';

import { CellSize, Color } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.COLOR_WHITE,
    paddingBottom: CellSize,
  },
  title: {
    fontSize: CellSize,
    color: Color.TITLE_COLOR,
    fontWeight: 'bold',
    marginBottom: 30,
    opacity: 0.9,
  },
});

export default styles;
