import { StyleSheet } from 'react-native';

import { CellSize, Color } from '../../components';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  backIcon: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    opacity: 0.9,
  },
  title: {
    color: Color.TITLE_COLOR,
    fontSize: CellSize / 1.5,
    fontWeight: 'bold',
    lineHeight: CellSize / 1.5,
    opacity: 0.7,
  },
});

export default styles;
