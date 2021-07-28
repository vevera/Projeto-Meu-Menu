import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, Button } from "react-native";
//import {  } from "react-native-gesture-handler";

import { Input } from "react-native-elements";

export default ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params ? route.params : {});
  return (
    <View style={style.form}>
      <Text style={style.text}>Categoria</Text>
      <Input
        //onChangeText={(title) => setTitle({ title })}
        placeholder="informe o nome da Categoria"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        //value={title ? title : ""}
      />
      <Text style={style.text}>Descrição</Text>
      <Input
        //onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="Descrição do produto"
        numberOfLines={4}
        multiline
        rightIcon={{ type: "font-awesome", name: "edit" }}
        //keyboardType="numeric"
        //value={prod.price.toString() ? prod.price.toString() : ""}
      />
      <Button
        title="Salvar"
        onPress={() => {
          navigation.goBack();
        }}
      />
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
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 15,
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});
