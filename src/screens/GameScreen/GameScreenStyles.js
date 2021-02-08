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
  backIcon: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    opacity: 0.9,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: CellSize / 1.5,
    lineHeight: CellSize / 1.5,
    color: Color.TITLE_COLOR,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalText: {
    color: '#fff',
    fontSize: CellSize,
  },
  modalTextGray: {
    color: '#c6d3dc',
  },
  modalTextBlue: {
    color: '#3290e8'
  }
});

export default styles;
