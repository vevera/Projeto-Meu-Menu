import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Image, View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as data from '../../connection.json';
import {styleCadastroProduto} from './StyleItem.js';

import {cadastrarProduto} from '../../conn/produtos.js'

export default ({route, navigation}) => {

  const idLoja = route.params.idLoja;
  const idCat = route.params.idCat;
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [infoProduto, setInfoProduto] = useState('');
  const [base64Image, setBase64Image] = useState('');

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
