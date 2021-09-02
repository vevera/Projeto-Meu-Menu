import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Image, View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styleCadastroProduto} from './StyleItem.js'; // E importado o estilo do arquivo StyleItem.js
import {cadastrarProduto} from '../../conn/produtos.js';  // Aqui importamos as funcoes necessarias para fazermos a comunicacao com o banco 

// Esta componente é referente a tela cadastro de produtos, Apos o usuario digitar os dados e informações do produto e clicar em salvar é feita a adição desse novo produto no banco 
export default ({route, navigation}) => {

  // Todos os const abaixo criados vão ser usados na chamada da função cadastrarProdutos
  // É nessessario setarmos o id da loja e da categoria para podermos efetuar o cadastro
  const idLoja = route.params.idLoja;
  const idCat = route.params.idCat;
  // Aqui temos as variaveis necessarias para serem feitas o cadastro e são modificadas a medida que o usuari digita no input
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [infoProduto, setInfoProduto] = useState('');
  const [base64Image, setBase64Image] = useState('');

  
  // com o chosseFile sera possivel ter acesso a galeria do aparelho do usuario e este podera escolher uma imagem para o produto
  // A imagem escolhida vai ser convertida em base64 e enviada posteriormente, caso seja clicado em salvar, ao banco
  // aqui é utilizada a funcao launchImageLibrary
  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setBase64Image(response.assets[0].base64);
    });
  };

  // Aqui temos a interface sendo composta tambem de 3 inputs no qual serão definidos pelo usuario o nome, preco e as informações do produto
  // Temos tambem uma opção Escolha Uma Imagem que ao ser interagida abre a galeria do usuario e ele podera escolher a partir dai uma imagem para o produto
  return (
    <ScrollView>
      <View>
        <View>
          <View>
            {base64Image === '' ? (
              <View
                style={styleCadastroProduto.viewImagem}>
                <TouchableOpacity onPress={chooseFile}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                    }}>
                    Escolha uma imagem
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Image
                style={styleCadastroProduto.imagem}
                source={{uri: `data:image/jpg;base64,${base64Image}`}}
                resizeMode="contain"
              />
            )}
          </View>
        </View>

        <Text style={styleCadastroProduto.text}>Produto</Text>
        <Input
          onChangeText={text => {
            setNomeProduto(text);
          }}
          placeholder="informe o nome do produto"
          rightIcon={{type: 'font-awesome', name: 'edit'}}
        />
        <Text style={styleCadastroProduto.text}>Preço</Text>
        <Input
          onChangeText={text => {
            setPrecoProduto(text);
          }}
          placeholder="informe o preço do produto"
          rightIcon={{type: 'font-awesome', name: 'edit'}}
          keyboardType="numeric"
        />
        <Text style={styleCadastroProduto.text}>Informações</Text>
        <Input
          onChangeText={text => {
            setInfoProduto(text);
          }}
          placeholder="Informações do produto"
          rightIcon={{type: 'font-awesome', name: 'edit'}}
        />
        <Button 
        /* Temos um botão de salvar, ao clicar é acionado um alerta com opções de cancelar e confitmar 
         * Ao clicar em CONFIRMAR é chamada a função cadastrarProduto e o navigate para a tela da lista de produtos
         * Ao clicar em CANCELAR o salvamento é cancelado        
        */
          containerStyle={styleCadastroProduto.buttonS}
          title="Salvar"
          type="clear"
          titleStyle={styleCadastroProduto.titleButton}
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
                    cadastrarProduto(idLoja, nomeProduto, infoProduto, precoProduto, base64Image, idCat);
                    navigation.navigate('ProdList', {'mudar': false})
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
