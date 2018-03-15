import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: 'flex-start',
      justifyContent: 'center'
  }, 
  headerText: {
    color: '#ccc',
    fontSize: 18,
    marginTop: 40,
    width:'100%'
  },
  imageHolder: {
    height: 220
  },
  activityIndicator: {  
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width:'100%'
 },
 imageData: {
   color: '#ccc',
   fontSize: 16,
   marginBottom: 20,
   width:'100%'
 }
});