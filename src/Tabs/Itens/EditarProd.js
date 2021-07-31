import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { View } from "react-native";
import { Touchable } from "react-native";
import {
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import ListItem from "./ListaRender";
import { SimpleModal } from "./SimpleModal";
//import { ImagePicker } from "./Imagem";

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

function ListaOp() {
  return (
    <View>
      <FlatList
        data={addData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            data={item}
            handleRight={() => alert("Opcional excluido!")}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
}
const ShowList = <ListaOp />;
const Separator = () => (
  <View style={{ flex: 1, height: 1, backgroundColor: "#FFF" }} />
);

const RenderItem = ({ item }) => {
  const [shouldShow, setshouldShow] = useState(false);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => setshouldShow(!shouldShow)}>
        <Text style={style.item}>
          {item.title}
          {"\n"}
          Valor: R${item.price}
        </Text>
      </TouchableOpacity>
      {shouldShow ? (
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 50,
              elevation: 3,
              backgroundColor: "#fff",
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 10,
              flexDirection: "row",
              marginHorizontal: 7,
            }}
            onPress={() => {
              <Text>
                {prod.name} {prod.price}
              </Text>;
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "blue" }}>
              Atualizar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 50,
              elevation: 3,
              backgroundColor: "#fff",
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 10,
            }}
            onPress={() => {
              <Text>
                {prod.name} {prod.price}
              </Text>;
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
              Remover
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
};

const itemsListArr = addData.map((item) => (
  <RenderItem key={item.id} item={item} />
));

export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };
  const setData = (data) => {
    setprod(data);
  };
  return (
    <View>
      <ScrollView style={style.form}>
        <Image style={style.imagem} source={{ uri: prod.image }} />
        <View>
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
            keyboardType="numeric"
            value={prod.price.toString() ? prod.price.toString() : ""}
          />
          <Text style={style.text}>Informações</Text>
          <Input
            onChangeText={(info) => setprod({ ...prod, info })}
            placeholder="informe o preço do produto"
            rightIcon={{ type: "font-awesome", name: "edit" }}
            //keyboardType="numeric"
            value={prod.info ? prod.info : ""}
          />
        </View>
        <Text style={style.header}>Opções Adicionais</Text>
        <SafeAreaView>{itemsListArr}</SafeAreaView>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 50,
            elevation: 3,
            backgroundColor: "#fff",
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 10,
          }}
          onPress={() => {
            <Text>
              {prod.name} {prod.price}
            </Text>;
            navigation.goBack();
          }}
        >
          <Icon name={"add"} size={30} color="#01a699" />
        </TouchableOpacity>
        <Text style={style.header}>Promoção</Text>
        <TouchableOpacity onPress={() => changeModalVisible(true)}>
          <Text style={style.itemP}>
            Produto: {prod.name}
            {"\n"}
            Desconto: 50%
            {"\n"}
            Novo valor: {(prod.price * 50) / 100}
            {"\n"}
            Validade: 16:00 04/10
            {"\n"}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 50,
              elevation: 3,
              backgroundColor: "#fff",
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 10,
              marginHorizontal: "1%",
            }}
            onPress={() => {
              <Text>
                {prod.name} {prod.price}
              </Text>;
              navigation.goBack();
            }}
          >
            <Icon name={"remove"} size={30} color="#ff0000" />
          </TouchableOpacity>
        </View>
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
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        marginTop="100"
        visible={isModalVisible}
        onRequestClose={() => changeModalVisible(false)}
      >
        <SimpleModal
          changeModalVisible={changeModalVisible}
          setData={setData}
        />
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    //marginTop: "8%",
    //marginBottom: 40,
    backgroundColor: "white",
    flex: 0,
    padding: 12,
    //alignItems: "center",
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

    //textAlign: "center",
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 27,
    fontWeight: "bold",
    height: 40,
    backgroundColor: "#036d19",
    color: "white",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    fontSize: 20,
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    width: "95%",
    height: 80,
    alignSelf: "center",
  },
  itemP: {
    padding: 10,
    fontSize: 20,
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    width: "95%",
    //height: 80,
    alignSelf: "center",
  },
  buttonR: {
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
    //alignItems: "center",
    //justifyContent: "center",
    //paddingVertical: 12,
    //paddingHorizontal: 32,
    //borderRadius: 4,
    //elevation: 3,
  },
  buttonS: {
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
    //alignItems: "center",
    //justifyContent: "center",
    //paddingVertical: 12,
    //paddingHorizontal: 32,
    //borderRadius: 4,
    //elevation: 3,
  },
  imagem: {
    width: "100%",
    height: 200,
    //width: "30%",
    //height: 100,
    marginBottom: 14,
  },
  btnAdd: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 3,
    backgroundColor: "white",
  },
  btnProm: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 3,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
