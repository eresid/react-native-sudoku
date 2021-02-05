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
  titleWrapper: {
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 28,
    paddingBottom: 28,
    marginBottom: 8,
  },
  line: {
    position: 'absolute',
    backgroundColor: Color.TITLE_LINE_COLOR,
    borderRadius: 15,
  },
  lineHorizontal: {
    width: CellSize*3,
    height: 2
  },
  lineHorizontalLeft: {
    bottom: 24,
    left: 0,
  },
  lineHorizontalRight: {
    top: 24,
    right: 0,
  },
  lineVertical: {
    width: 2,
    height: CellSize*3
  },
  lineVerticalLeft: {
    bottom: 0,
    left: 15,
  },
  lineVerticalRight: {
    top: 0,
    right: 15
  },
  title: {
    fontSize: CellSize*2,
    color: Color.TITLE_COLOR,
    fontWeight: 'bold',
  },
});

export default styles;
