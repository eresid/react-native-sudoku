import {StyleSheet} from 'react-native';

import {Size, CellSize, BoardWidth} from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cadetblue',
    paddingBottom: CellSize,
  },
  header: {
    width: BoardWidth,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: CellSize,
    height: CellSize,
  },
  timer: {
    fontSize: (CellSize * 3) / 4,
    alignSelf: 'center',
    color: '#fff',
    opacity: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'teal',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  editing: {
    tintColor: 'khaki',
    opacity: 1,
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: CellSize,
    color: '#fff',
  },
  about: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: CellSize / 2,
    color: '#fff',
    opacity: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: Size.height > 500 ? 20 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: CellSize,
    height: CellSize,
  },
  buttonText: {
    marginLeft: CellSize / 2,
    color: '#fff',
    fontSize: (CellSize * 3) / 4,
    fontFamily: 'Menlo',
  },
  record: {
    backgroundColor: 'cadetblue',
    paddingVertical: CellSize / 6,
    borderColor: 'darkcyan',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  recordText: {
    height: (CellSize * 4) / 6,
    marginVertical: CellSize / 6,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Menlo',
    fontSize: (CellSize * 2) / 4,
    lineHeight:
      Platform.OS == 'android'
        ? Math.floor((CellSize * 4) / 6)
        : (CellSize * 4) / 6,
  },
  highlightText: {
    color: 'khaki',
  },
  triangle: {
    position: 'absolute',
    left: Size.width / 2 - CellSize / 3 / 2,
    top: -CellSize / 3 / 2,
    width: CellSize / 3,
    height: CellSize / 3,
    backgroundColor: 'teal',
    borderColor: 'darkcyan',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
});

export default styles;
