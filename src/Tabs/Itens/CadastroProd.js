import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
//import {  } from "react-native-gesture-handler";

import { Input } from "react-native-elements";

export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  return (
    <View style={style.form}>
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
      <Button title="Salvar" />
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
  text2: {
    padding: 10,
    fontSize: 50,
    textAlign: "center",
  },
});
