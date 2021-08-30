import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import * as data from '../../connection.json';
import {styleCadastroCategoria} from './StyleItem.js'

import {cadastrarCategoria} from '../../conn/categoria.js'

export default ({route, navigation}) => {
  
  const idLoja = route.params.idLoja;
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [infoCategoria, setInfoCategoria] = useState('');

  return (
    <View style={styleCadastroCategoria.form}>
      <Text style={styleCadastroCategoria.text}>Categoria</Text>
      <Input
        onChangeText={text => {
          setNomeCategoria(text);
        }}
        placeholder="informe o nome da Categoria"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
      />
      <Text style={styleCadastroCategoria.text}>Descrição</Text>
      <Input
        onChangeText={text => {
          setInfoCategoria(text);
        }}
        placeholder="Descrição do produto"
        multiline
        rightIcon={{type: 'font-awesome', name: 'edit'}}
      />
      <Button
        containerStyle={styleCadastroCategoria.buttonS}
        title="Salvar"
        type="clear"
        titleStyle={styleCadastroCategoria.titleButton}
        onPress={() => {
          Alert.alert(
            'Salvar Alterações',
            'Deseja aplicar as alterações do Produto?',
            [
              {
                text: 'CANCELAR',
                onPress: () => {},
              },
              {
                text: 'CONFIRMAR',
                onPress: () => {
                  (nomeCategoria === '') | (nomeCategoria === '')
                    ? {}
                    : cadastrarCategoria(idLoja, nomeCategoria, infoCategoria) 
                    navigation.navigate('ProdList');
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
