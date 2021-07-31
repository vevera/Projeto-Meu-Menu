import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, View, StyleSheet, Button } from "react-native";
//import {  } from "react-native-gesture-handler";

import { Input } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  function imagePickerCallback(data) {
    console.log(data);
  }

  return (
    <View style={style.form}>
      <Image
        style={style.imagem}
        source={{
          uri: "https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png",
        }}
      />
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => ImagePicker.launchImageLibrary({}, imagePickerCallback)}
      >
        <Text>Adicionar imagem</Text>
      </TouchableOpacity>
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
      <Button title="Salvar" />
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
});
