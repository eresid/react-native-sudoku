import { StyleSheet } from 'react-native';

import { NumbersCellSize } from '../GlobalStyle';

const styles = StyleSheet.create({
  cell: {
    width: NumbersCellSize,
    height: NumbersCellSize,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#333',
    fontSize: (NumbersCellSize * 2) / 3,
    fontFamily: 'HelveticaNeue',
  },
});

export default styles;
