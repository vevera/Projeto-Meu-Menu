import {StyleSheet} from 'react-native';


const styleCadastroCategoria = StyleSheet.create({
    form: {
      padding: 12,
    },
    input: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 15,
    },
    text: {
      padding: 10,
      fontSize: 20,
    },
    buttonS: {
      alignSelf: 'center',
      marginHorizontal: '10%',
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
  
    titleButton: {
      color: 'blue',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });


const styleEditarCategoria = StyleSheet.create({
    form: {
      padding: 12,
    },
    input: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 15,
    },
    text: {
      padding: 10,
      fontSize: 20,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 14,
    },
    buttonR: {
      marginHorizontal: '10%',
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
    buttonS: {
      marginHorizontal: '10%',
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
    buttonSTitle: {
      color: 'blue',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    buttonRTitle: {
      color: 'red',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    viewButtons: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
  });

const styleCadastroProduto = StyleSheet.create({
    form: {
      padding: 12,
  
    },
    input: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 15,
    },
    text: {
      padding: 10,
      fontSize: 20,
    },
    text2: {
      padding: 10,
      fontSize: 50,
      textAlign: 'center',
    },
    imagem: {
      alignSelf: 'center',
      width: '100%',
      height: 300,
      marginBottom: 14,
    },
    buttonS: {
      alignSelf: 'center',
      marginHorizontal: '10%',
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
    titleButton: {
      color: 'blue',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    viewImagem: {
      alignItems: 'center',
      margin: '10%',
    },
  });

const styleEditarProduto = StyleSheet.create({
    viewHeader: {
      fontSize: 23,
      marginLeft: 10,
      fontWeight: 'bold',
      height: 40,
      color: 'white',
      fontStyle: 'italic',
      textDecorationLine: 'underline',
    },
    modalAdicionar: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      backgroundColor: 'white',
      flex: 0,
      padding: 12,
    },
    input: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 15,
    },
    text: {
      fontWeight: 'bold',
      padding: 10,
      fontSize: 20,
    },
    text2: {
      padding: 10,
      fontSize: 30,
    },
    header: {
      width: '100%',
      justifyContent: 'center',
      height: 40,
      backgroundColor: '#18BC9C',
      borderRadius: 10,
    },
    item: {
      flexDirection: 'row',
      padding: 10,
      fontSize: 20,
      marginTop: 2,
      marginBottom: 4,
      backgroundColor: '#f8f8ff',
      borderRadius: 8,
      width: '95%',
      height: 80,
      alignSelf: 'center',
    },
    itemP: {
      padding: 10,
      fontSize: 20,
      marginTop: 2,
      marginBottom: 4,
      backgroundColor: '#f8f8ff',
      borderRadius: 8,
      width: '95%',
      alignSelf: 'center',
    },
    buttonR: {
      marginRight: 20,
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
    buttonS: {
      marginLeft: 20,
      marginBottom: 40,
      marginTop: 20,
      width: '40%',
      borderRadius: 50,
    },
    imagem: {
      width: '100%',
      height: 300,
      marginBottom: 14,
    },
    btnAdd: {
      marginBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      backgroundColor: 'white',
    },
    btnProm: {
      marginBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    textView: {
      color: 'grey',
      alignSelf: 'center',
      margin: 5,
      fontSize: 26,
      fontWeight: 'bold',
    },
    textadd: {
      marginLeft: 13,
      margin: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    styleBtnAdicionarPromo: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50,
      elevation: 3,
      backgroundColor: '#fff',
      borderRadius: 50,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 10,
      marginHorizontal: '1%',
    },
    styleBtnRemoverPromo: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50,
      elevation: 3,
      backgroundColor: '#fff',
      borderRadius: 50,
      alignSelf: 'center',
      marginBottom: 10,
    },
    buttonSTitle: {
      color: 'blue',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    buttonRTitle: {
      color: 'red',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    viewButtons: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    buttonAddOP: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50,
      elevation: 3,
      backgroundColor: '#fff',
      borderRadius: 50,
      alignSelf: 'center',
      marginBottom: 10,
    },
    viewRemove: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#f8f8ff',
    },
    touchableRemove: {
      backgroundColor: 'red',
      width: 70,
      height: 70,
      borderRadius: 10,
      justifyContent: 'center',
    },
    viewModal1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      viewModal2: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
      },
  });

const styleListaProduto = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: 'white',
    },
    item: {
      flexDirection: 'row',
      marginTop: 2,
      marginBottom: 2,
      marginTop: 2,
      backgroundColor: '#f8f8ff',
      borderRadius: 8,
      width: '95%',
      height: 80,
      alignSelf: 'center',
    },
    subtitulo: {
      fontWeight: 'bold',
      color: 'grey',
    },
    subtitulo_promo: {
      textDecorationLine: 'line-through',
      fontWeight: 'bold',
      color: 'grey',
    },
    header: {
      marginHorizontal: '2%',
      marginBottom: '2%',
      width: '100%',
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      fontStyle: 'italic',
      textDecorationLine: 'underline',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    imagem: {
      marginHorizontal: '2%',
      alignSelf: 'flex-end',
      width: 80,
      height: '90%',
      borderRadius: 10,
    },
    viewHeader: {
      justifyContent: 'center',
      backgroundColor: '#2c3e50',
      height: 60,
      borderRadius: 10,
      width: '98%',
      alignSelf: 'center',
    },
    viewFooterCat: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8ff',
    },
    viewFooter: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8ff',
    },
  });

export {styleEditarCategoria , styleCadastroCategoria, styleCadastroProduto, styleEditarProduto, styleListaProduto};
