import { StyleSheet } from 'react-native';

import { CellSize, BorderWidth } from '../GlobalStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CellSize * 9 + BorderWidth * 6,
    backgroundColor: 'grey',
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: BorderWidth,
    borderRadius: 5,
  },
  stackWrapper: {
    flexDirection: 'row',
  },
});

export default styles;
