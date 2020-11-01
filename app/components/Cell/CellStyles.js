import {StyleSheet, Platform} from 'react-native';

import {CellSize, BorderWidth} from '../GlobalStyle';

const styles = StyleSheet.create({
  handle: {
    width: CellSize,
    height: CellSize,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cell: {
    width: CellSize,
    height: CellSize,
    backgroundColor: 'lightyellow',
    borderColor: 'orange',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: BorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#333',
    fontSize: (CellSize * 2) / 3,
    fontFamily: 'HelveticaNeue',
  },
  editingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'teal',
    fontSize: (CellSize * 2) / 5,
    marginHorizontal: CellSize / 8,
    ...Platform.select({
      ios: {
        marginTop: CellSize / 12,
        lineHeight: (CellSize * 2) / 5,
      },
      android: {
        lineHeight: Math.floor((CellSize * 2) / 4),
      },
    }),
  },
  filledCell: {
    backgroundColor: 'moccasin',
  },
  fixedCell: {
    backgroundColor: 'khaki',
  },
  fixedText: {
    color: '#666',
  },
  highlightCell: {
    backgroundColor: 'peru',
  },
  highlightText: {
    color: '#fff',
  },
});

export default styles;
