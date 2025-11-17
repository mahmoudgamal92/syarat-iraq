import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    featureButtonSelected: {
        backgroundColor: '#00C1A6', 
        width:80,
        height:80,
        maxHeight:80
      },
      featureGrid: {
        flexGrow: 1,
      },
      featureButton: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        margin: 4,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
      },
      featureText: {
        fontSize: 10,
        color: '#333',
        marginTop: 4,
        textAlign: 'center',
        fontFamily:'Regular'
      },
      featureTextSelected: {
        color: '#FFF',
      },
  });