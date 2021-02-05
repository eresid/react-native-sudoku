import { Dimensions } from 'react-native';

export const Size = Dimensions.get('window');

export const BoardWidth = Size.width;

export const CellSize = Math.floor(BoardWidth / 10);

export const NumbersCellSize = Math.floor(BoardWidth / 9)

export const BorderWidth = 3;

export const Color = {
  THEME_COLOR: '#2196f3',
  COLOR_WHITE: '#ffffff',
  TITLE_COLOR: '#3c495e',
  TITLE_LINE_COLOR: '#eaeaea'
  // COLOR_WHITE: '#f8f8f8',
  // TITLE_COLOR: '#272C34',
};
