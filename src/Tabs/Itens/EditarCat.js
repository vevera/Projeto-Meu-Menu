import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import * as data from '../../connection.json';

import {styleEditarCategoria} from './StyleItem.js';

import {atualizarCategoria, removerCategoria} from '../../conn/categoria.js';


export default ({route, navigation}) => {
 
  const [section, setSection] = useState(route.params ? route.params : {});
  const [nomeCategoria, setNomeCategoria] = useState(section.name);
  const [infoCategoria, setInfoCategoria] = useState(section.description);
  const idCat = section.id;
  const idLoja = section.idLoja;
  
  return (
    <View style={styleEditarCategoria.form}>
      <Text style={styleEditarCategoria.text}>Categoria</Text>
      <Input
        onChangeText={title => setNomeCategoria(title)}
        placeholder="informe o nome da Categoria"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        value={nomeCategoria ? nomeCategoria : ''}
      />
      <Text style={styleEditarCategoria.text}>Descrição</Text>
      <Input
        onChangeText={texto => setInfoCategoria(texto)}
        placeholder="Descrição do produto"
        multiline
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        value={infoCategoria ? infoCategoria : ''}
      />
      <View
        style={styleEditarCategoria.viewButtons}>
        <Button
          containerStyle={styleEditarCategoria.buttonR}
          title="Remover"
          type="clear"
          titleStyle={styleEditarCategoria.buttonRTitle}
          onPress={() => {
            Alert.alert(
              'Remover',
              'Cuidado, essa ação também removerá os produtos associados a esta categoria! Deseja continuar?',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => {},
                },
                {
                  text: 'CONFIRMAR',
                  onPress: () => {
                    removerCategoria(idLoja, idCat);
                    navigation.navigate('ProdList');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
        <Button
          containerStyle={styleEditarCategoria.buttonS}
          title="Salvar Alterações"
          type="clear"
          titleStyle={styleEditarCategoria.buttonSTitle}
          onPress={() => {
            Alert.alert(
              'Salvar',
              'Deseja aplicar as alterações da Categoria?',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => console.log('CANCEL Pressed'),
                },
                {
                  text: 'CONFIRMAR',
                  onPress: () => {
                    atualizarCategoria(idLoja, idCat, nomeCategoria, infoCategoria);
                    navigation.navigate('ProdList');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </View>
    </View>
  );
};
