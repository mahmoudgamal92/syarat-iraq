import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },

  featureGrid: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

   Button: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Bold',
  },
});