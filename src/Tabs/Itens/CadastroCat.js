import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert} from 'react-native';
//import {  } from "react-native-gesture-handler";
import {Button, Input, Icon} from 'react-native-elements';

export default ({route, navigation}) => {
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [infoCategoria, setInfoCategoria] = useState('');

  function cadastrarCategoria() {
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
                onPress: () => {
                  cadastrarCategoria();
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
