import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: '#3b3b3b',
    borderRadius: 25,
    padding: 12,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  carIconContainer: {
    backgroundColor: '#ffa726',
    borderRadius: 25,
    padding: 12,
  },
  carIcon: {
    fontSize: 24,
    color: '#fff',
  },
  instructions: {
    color: '#5C4CF2',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Regular"
  },
  formContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  uploadButton: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 10,
  },
  footerButton: {
    padding: 8,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footerIcon: {
    width: 40,
    height: 40,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'right',
    fontFamily: "Regular"
  },

  sectionTitle: {
    fontSize: 14,
    color: '#00C1A6',
    fontFamily: 'Bold',
  },
  featureButtonSelected: {
    backgroundColor: '#00C1A6',
  },
  featureGrid: {
    flexGrow: 1,
  },
  featureButton: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
});
