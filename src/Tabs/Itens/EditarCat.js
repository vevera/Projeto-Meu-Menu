import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import * as data from '../../connection.json';

export default ({route, navigation}) => {
 
  const [section, setSection] = useState(route.params ? route.params : {});
  const [nomeCategoria, setNomeCategoria] = useState(section.name);
  const [infoCategoria, setInfoCategoria] = useState(section.description);
  const idCat = section.id;
  const idLoja = section.idLoja;
  console.log("ID LOJA =>> ", idLoja);

  function atualizarCategoria() {
    
    
    
    
    
    
    //console.log('ATUALIZAR');
    //console.log('nome = ', nomeCategoria);
    //console.log('info = ', infoCategoria);
  }

  function removerCategoria() {
    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/categories`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          category_id: idCat,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(resposta => console.log(resposta))
      .then(() => {
        Alert.alert('Categoria removida com sucesso!');
      })
      .catch(error => console.log(error));

  }

  console.log(section);
  return (
    <View style={style.form}>
      <Text style={style.text}>Categoria</Text>
      <Input
        onChangeText={title => setNomeCategoria(title)}
        placeholder="informe o nome da Categoria"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        value={nomeCategoria ? nomeCategoria : ''}
      />
      <Text style={style.text}>Descrição</Text>
      <Input
        onChangeText={texto => setInfoCategoria(texto)}
        placeholder="Descrição do produto"
        numberOfLines={4}
        multiline
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        //keyboardType="numeric"
        value={infoCategoria ? infoCategoria : ''}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <Button
          containerStyle={style.buttonR}
          title="Remover"
          type="clear"
          titleStyle={{
            color: 'red',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}
          //buttonStyle={{ backgroundColor: "lightred" }}
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
                    removerCategoria();
                    navigation.navigate('ProdList');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
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
              'Deseja aplicar as alterações da Categoria?',
              [
                {
                  text: 'CANCELAR',
                  onPress: () => console.log('CANCEL Pressed'),
                },
                {
                  text: 'CONFIRMAR',
                  onPress: () => {
                    atualizarCategoria();
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

const style = StyleSheet.create({
  form: {
    padding: 12,
    //marginTop: "8%",
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
});
