import { StyleSheet } from 'react-native';

import { CellSize, BorderWidth, Color } from '../GlobalStyle';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: CellSize,
    height: CellSize,
  },
  cell: {
    width: CellSize,
    height: CellSize,
    backgroundColor: '#D6E9FF',
    borderColor: '#D6E9FF',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: BorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.TITLE_COLOR,
    opacity: 0.8,
    fontSize: (CellSize * 2) / 4,
    fontFamily: 'HelveticaNeue',
  },
});

export default styles;
