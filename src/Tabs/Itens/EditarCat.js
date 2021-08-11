import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

export default ({route}) => {
  const id = route.params.idLoja;
  const idCat = '';
  const [section, setSection] = useState(route.params ? route.params : {});
  const [nomeCategoria, setNomeCategoria] = useState(section.title);
  const [infoCategoria, setInfoCategoria] = useState(section.descricao);

  function atualizarCategoria() {
    console.log('ATUALIZAR');
    console.log('nome = ', nomeCategoria);
    console.log('info = ', infoCategoria);
  }

  function removerCategoria() {
    fetch(
      `http://192.168.1.103:5000/store/${encodeURIComponent(id)}/categories`,
      {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          category_id: idCat,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(article => {
        Alert.alert('Categoria removida com sucesso!');
      });

    console.log('REMOVER');
    console.log('nome = ', nomeCategoria);
    console.log('info = ', infoCategoria);
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
