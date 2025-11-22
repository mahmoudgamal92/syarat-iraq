import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#4E148C',
    padding: 10,
    borderRadius: 50,
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  carIconContainer: {
    backgroundColor: '#FF9A52',
    padding: 10,
    borderRadius: 50,
  },
  carIcon: {
    fontSize: 20,
    color: '#FFF',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeImage: {
    resizeMode: 'contain',
    height: 120,
  },
  welcomeText: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'Bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#9368FF',
    fontFamily: 'Bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#FFF',
  },
});