import { StyleSheet } from 'react-native';
import { Color } from '../GlobalStyle';

const styles = StyleSheet.create({
  container: {
    borderColor: Color.THEME_COLOR,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
