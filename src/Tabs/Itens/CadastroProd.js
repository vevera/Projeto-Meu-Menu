import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Image, View, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-picker';

export default ({route, navigation}) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  const [filePath, setFilePath] = useState({});

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
      console.log('Response = ', response);

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
      console.log(response.ImgToBase64);
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);

      setFilePath(response);
    });
  };

  return (
    <View>
      <View>
        <View>
          {true ? (
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
            <Image style={style.imagem} resizeMode="contain" />
          )}
        </View>
      </View>

      <Text style={style.text}>Produto</Text>
      <Input
        //onChangeText={(name) => setprod({ ...prod, name })}
        placeholder="informe o nome do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        //value={prod.name ? prod.name : ""}
      />
      <Text style={style.text}>Preço</Text>
      <Input
        //onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="informe o preço do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        keyboardType="numeric"
        //value={prod.price.toString() ? prod.price.toString() : ""}
      />
      <Text style={style.text}>Informações</Text>
      <Input
        //onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="Informações do produto"
        rightIcon={{type: 'font-awesome', name: 'edit'}}
        keyboardType="numeric"
        //value={prod.price.toString() ? prod.price.toString() : ""}
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
          Alert.alert('Salvar', 'Deseja aplicar as alterações do Produto?');
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    //alignItems: "center",
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
