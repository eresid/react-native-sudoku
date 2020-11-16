import { StyleSheet } from 'react-native';

import { CellSize, BorderWidth } from '../GlobalStyle';

const styles = StyleSheet.create({
  container: {
    width: CellSize * 9 + BorderWidth * 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'orange',
  },
  grid: {
    margin: BorderWidth,
    width: CellSize * 3,
    height: CellSize * 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
