import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, View, StyleSheet } from "react-native";
//import {  } from "react-native-gesture-handler";
import { Button, Input, Icon } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});

  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    const options = {
      title: "You can choose one image",
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: "photo",
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        setImageSource(source.uri);
      }
    });
  }

  return (
    <View>
      <View>
        <View>
          {imageSource === null ? (
            <Image
              source={{
                uri: "https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png",
              }}
              style={style.imagem}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{ uri: imageSource }}
              style={style.imagem}
              resizeMode="contain"
            />
          )}
        </View>
        <TouchableOpacity onPress={selectImage}>
          <Text>Pick an image</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.text}>Produto</Text>
      <Input
        //onChangeText={(name) => setprod({ ...prod, name })}
        placeholder="informe o nome do produto"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        //value={prod.name ? prod.name : ""}
      />
      <Text style={style.text}>Preço</Text>
      <Input
        //onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="informe o preço do produto"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        keyboardType="numeric"
        //value={prod.price.toString() ? prod.price.toString() : ""}
      />
      <Text style={style.text}>Informações</Text>
      <Input
        //onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="Informações do produto"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        keyboardType="numeric"
        //value={prod.price.toString() ? prod.price.toString() : ""}
      />
      <Button
        containerStyle={style.buttonS}
        title="Salvar"
        type="clear"
        titleStyle={{
          color: "blue",
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
        //buttonStyle={{ backgroundColor: "green" }}
        onPress={() => {
          Alert.alert("Salvar", "Deseja aplicar as alterações do Produto?");
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
    borderColor: "grey",
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
    textAlign: "center",
  },
  imagem: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
  buttonS: {
    alignSelf: "center",
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
  },
});

/*
















*/
