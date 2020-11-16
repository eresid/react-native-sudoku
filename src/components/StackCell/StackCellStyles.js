import { StyleSheet } from 'react-native';

import { CellSize, BorderWidth } from '../GlobalStyle';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: CellSize,
    height: CellSize,
  },
  cell: {
    width: CellSize,
    height: CellSize,
    backgroundColor: 'moccasin',
    borderColor: 'orange',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: BorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#666',
    fontSize: (CellSize * 2) / 3,
    fontFamily: 'HelveticaNeue',
  },
});

export default styles;
