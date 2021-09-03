import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#18BC9C',
    },
    containerLogo: {
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      flex: 1,
      width: '90%',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: '#fff',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      fontSize: 17,
      borderRadius: 7,
      padding: 10,
    },
    btnsubmit: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'darkorange',
      borderRadius: 50,
      marginTop: 10,
    },
    textsubmit: {
      color: '#fff',
      fontSize: 18,
    },
    btnregister: {
      marginTop: 10,
    },
    textregister: {
      color: '#fff',
    },
    contentAlert: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    warningAlert: {
      paddingLeft: 10,
      color: '#bdbdbd',
      fontSize: 16,
    },
  });

export {styles};