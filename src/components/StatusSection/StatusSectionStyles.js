import { StyleSheet } from 'react-native';

import { CellSize, BoardWidth, BorderWidth, Color } from '../GlobalStyle';

const styles = StyleSheet.create({
  boardContainer: {
    // marginTop: 20,
    alignItems: 'center',
    width: BoardWidth,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Color.TITLE_COLOR,
    borderRadius: 8,
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
  iconsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  icons: {
    backgroundColor: 'rgba(204, 222, 244, 0.6)',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  lastIcon: {
    transform: [{ rotate: '180deg' }],
  },
  modelsWrapper: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  modelsSwitchesWrapper: {
    flexDirection: 'row',
  },
  modelsSwitch: {
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'orange',
  },
});

export default styles;
