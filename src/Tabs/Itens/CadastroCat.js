import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert} from 'react-native';
//import {  } from "react-native-gesture-handler";
import {Button, Input, Icon} from 'react-native-elements';

export default ({route, navigation}) => {
  const id = route.params;
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [infoCategoria, setInfoCategoria] = useState('');

  function cadastrarCategoria() {
    fetch(
      `http://192.168.1.103:5000/store/${encodeURIComponent(id)}/categories`,
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: nomeCategoria,
          description: infoCategoria,
          store_id: id,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(article => {
        Alert.alert('Categoria adicionada com sucesso!');
      });

    console.log('nome = ', nomeCategoria);
    console.log('info = ', infoCategoria);
  }

  return (
    <View style={style.form}>
      <Text style={style.text}>Categoria</Text>
      <Input
        onChangeText={text => {
          setNomeCategoria(text);
        }}
        placeholder="informe o nome da Categoria"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
      />
      <Text style={style.text}>Descrição</Text>
      <Input
        onChangeText={text => {
          setInfoCategoria(text);
        }}
        placeholder="Descrição do produto"
        numberOfLines={4}
        multiline
        rightIcon={{type: 'font-awesome', name: 'edit'}}
      />
      <Button
        containerStyle={style.buttonS}
        title="Salvar"
        type="clear"
        titleStyle={{
          color: 'blue',
          fontWeight: 'bold',
          textDecorationLine: 'underline',
        }}
        //buttonStyle={{ backgroundColor: "green" }}
        onPress={() => {
          Alert.alert(
            'Salvar',
            'Deseja aplicar as alterações do Produto?',
            [
              {
                text: 'CANCELAR',
                onPress: () => {},
              },
              {
                text: 'CONFIRMAR',
                // TESTAR AQUI
                onPress: () => {
                  (nomeCategoria === '') | (nomeCategoria === '')
                    ? {}
                    : cadastrarCategoria();
                },
              },
            ],
            {cancelable: false},
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
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
});
