import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  carIconContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 50,
  },
  carIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  HeaderIcon: {
    backgroundColor: '#5C4CF2',
    borderRadius: 50,
    margin: 5,
    padding: 10
  }
});