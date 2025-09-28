
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
  },
  iconButton: {
    backgroundColor: '#4C4CF2',
    borderRadius: 30,
    padding: 10,
  },
  carIcon: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  title: {
    color: '#000',
    fontFamily: 'Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  grid: {
    marginTop: 50,
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Bold',
    paddingHorizontal: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black',
  },
});
