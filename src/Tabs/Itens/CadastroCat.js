import React, {useState} from 'react';
import {TextInput, Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

// Aqui é importado o estilo da tela de cadastro de categorias
import {styleCadastroCategoria} from './StyleItem.js'

// Aqui vão ser importadas as funcoes necessarias para se efetuar o cadastro da categoria
import {cadastrarCategoria} from '../../conn/categoria.js'


export default ({route, navigation}) => {
  
  // Aqui declaramos consts que serão usadas no cadastro
  // idLoja é usado para podermos identificar a loja no qual iremos cadastrar a categoria 
  const idLoja = route.params.idLoja;
  // Aqui temos as variaveis em que serão guardadas as informações form=necidas pelo usuario por meio do input
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [infoCategoria, setInfoCategoria] = useState('');

  // Aqui vai estar o codigo referente a parte que vai ser visualizada pelo usuaria composta de dois inputs além de um botão para salvar as alterações
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
      /* Aqui temos o botão que ao clicar é acionado um alert com as opções CANCELAR e CONFIRMAR 
         Ao clicar em CANCELAR a acao é cancelada
         Ao clicar em CONFIRMAE é chamada a função cadastrarCategoria, no qual se possível irá 
         cadastrar a categoria e por fim será chamado o navigator para voltar a tela de lista de produtos
      
      */
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
