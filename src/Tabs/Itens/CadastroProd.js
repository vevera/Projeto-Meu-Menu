import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Image, View, StyleSheet, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default ({route, navigation}) => {
  const id = route.params;
  const idCat = '';
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

  function cadastrarProduto() {
    fetch(
      `http://192.168.1.103:5000/store/${encodeURIComponent(id)}/products`,
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: nomeProduto,
          description: infoProduto,
          price: precoProduto,
          photo: base64Image,
          category_id: idCat,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(article => {
        Alert.alert('Produto adicionado com sucesso!');
      });

    console.log('imagem = ', base64Image);
    console.log('produto = ', nomeProduto);
    console.log('preço = ', precoProduto);
    console.log('info = ', infoProduto);
  }

  return (
    <View>
      <View>
        <View>
          {base64Image === '' ? (
            <View
              style={{
                alignItems: 'center',
                margin: '10%',
              }}>
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
              style={style.imagem}
              source={{uri: `data:image/jpg;base64,${base64Image}`}}
              resizeMode="contain"
            />
          )}
        </View>
      </View>

      <Text style={style.text}>Produto</Text>
      <Input
        onChangeText={text => {
          setNomeProduto(text);
        }}
        placeholder="informe o nome do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
      />
      <Text style={style.text}>Preço</Text>
      <Input
        onChangeText={text => {
          setPrecoProduto(text);
        }}
        placeholder="informe o preço do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        keyboardType="numeric"
      />
      <Text style={style.text}>Informações</Text>
      <Input
        onChangeText={text => {
          setInfoProduto(text);
        }}
        placeholder="Informações do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        //keyboardType="numeric"
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
                  cadastrarProduto();
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
  text2: {
    padding: 10,
    fontSize: 50,
    textAlign: 'center',
  },
  imagem: {
    alignSelf: 'center',
    width: 200,
    height: 200,
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

/*
















*/
