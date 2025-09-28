import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: "#DDDDDD",
  },
  iconContainer: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  carIconContainer: {
    width: '30%',
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