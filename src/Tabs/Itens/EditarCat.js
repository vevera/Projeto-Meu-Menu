import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
//import {  } from "react-native-gesture-handler";

export default ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params ? route.params : {});
  return (
    <View style={style.form}>
      <Text style={style.text}>Categoria</Text>
      <Input
        onChangeText={(title) => setTitle({ title })}
        placeholder="informe o nome da Categoria"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        value={title ? title : ""}
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
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Button
          containerStyle={style.buttonR}
          title="Remover"
          type="clear"
          titleStyle={{
            color: "red",
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
          //buttonStyle={{ backgroundColor: "lightred" }}
          onPress={() => {
            Alert.alert("Remover", "Deseja Remover o produto?");
          }}
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 14,
  },
  buttonR: {
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
  },
  buttonS: {
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
  },
});
