import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Button, Input } from "react-native-elements";

export const addData = [
  {
    id: "1",
    title: "Opção Adicional 1",
    price: 1,
  },
  {
    id: "2",
    title: "Opção Adicional 2",
    price: 3,
  },
  {
    id: "3",
    title: "Opção Adicional 3",
    price: 2,
  },
  {
    id: "4",
    title: "Opção Adicional 4",
    price: 1,
  },
];

const RenderItem = ({ item }) => {
  return (
    <Text style={{ fontSize: 18, margin: 10 }}>
      {item.title} - R${item.price}
    </Text>
  );
};

const itemsListArr = addData.map((item) => (
  <RenderItem key={item.id} item={item} />
));

export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  return (
    <ScrollView style={style.form}>
      <Image source={require("../../../assets/cinza.png")} style={style.image} />
      <Text style={style.text}>Produto</Text>
      <Input
        onChangeText={(name) => setprod({ ...prod, name })}
        placeholder="informe o nome do produto"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        value={prod.name ? prod.name : ""}
      />
      <Text style={style.text}>Preço</Text>
      <Input
        onChangeText={(price) => setprod({ ...prod, price })}
        placeholder="informe o preço do produto"
        rightIcon={{ type: "font-awesome", name: "edit" }}
        //keyboardType="numeric"
        value={prod.price.toString() ? prod.price.toString() : ""}
      />
      <Text style={style.text2}>Opções Adicionais</Text>

      <SafeAreaView>{itemsListArr}</SafeAreaView>

      <Text style={style.text2}>Promoções</Text>
      <Text style={style.text}>Exemplo</Text>

      <Button
        containerStyle={style.button}
        title="Salvar"
        onPress={() => {
          <Text>
            {prod.name} {prod.price}
          </Text>;
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  form: {
    marginTop: "8%",
    //marginBottom: 40,
    flex: 0,
    padding: 12,
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
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    marginBottom: 40,
    //alignItems: "center",
    //justifyContent: "center",
    //paddingVertical: 12,
    //paddingHorizontal: 32,
    //borderRadius: 4,
    elevation: 3,
    //backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 14,
  },
});
