import {StyleSheet} from 'react-native';

import {CellSize, BoardWidth, BorderWidth} from '../GlobalStyle';

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: BoardWidth,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'orange',
    padding: BorderWidth,
  },
  row: {
    position: 'absolute',
    backgroundColor: 'transparent',
    margin: BorderWidth * 2,
    top: 0,
    left: 0,
    width: CellSize * 9 + BorderWidth * 4,
    height: CellSize,
    borderColor: 'peru',
    borderWidth: 2,
    borderRadius: BorderWidth,
  },
  column: {
    position: 'absolute',
    backgroundColor: 'transparent',
    margin: BorderWidth * 2,
    top: 0,
    left: 0,
    width: CellSize,
    height: CellSize * 9 + BorderWidth * 4,
    borderColor: 'peru',
    borderWidth: 2,
    borderRadius: BorderWidth,
  },
});

export default styles;
