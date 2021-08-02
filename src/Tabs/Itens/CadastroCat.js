import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";
//import {  } from "react-native-gesture-handler";
import { Button, Input, Icon } from "react-native-elements";

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
  buttonS: {
    alignSelf: "center",
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
  },
});
