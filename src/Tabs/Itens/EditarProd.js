import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { View } from "react-native";
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
import { Swipeable } from "react-native-gesture-handler";

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
  //const [shouldShow, setshouldShow] = useState(false);
  const Remove = () => {
    function Delete() {}

    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#f8f8ff",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: 70,
            height: 70,
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={Delete}
        >
          <Icon type="font-awesome" name="trash" size={45} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Swipeable renderRightActions={Remove}>
        <Text style={style.item}>
          {item.title}
          {"\n"}
          Valor: R${item.price}
        </Text>
      </Swipeable>
    </SafeAreaView>
  );
};

const itemsListArr = addData.map((item) => (
  <RenderItem key={item.id} item={item} />
));

export default ({ route, navigation }) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  const [isModalVisible, setisModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };
  const setData = (data) => {
    setprod(data);
  };

  function temImagem(imagem) {
    return imagem ? (
      <Image style={style.imagem} source={{ uri: imagem }} />
    ) : (
      <Image
        style={style.imagem}
        source={{
          uri: "https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png",
        }}
      />
    );
  }

  function promocaoAtiva(promocao) {
    if (promocao.desconto != null) {
      return (
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity onPress={() => changeModalVisible(true)}>
            <Text style={style.itemP}>
              Produto: {prod.name}
              {"\n"}
              Desconto: {promocao.desconto}%{"\n"}
              Novo valor: {(prod.price * promocao.desconto) / 100}
              {"\n"}
              Validade: {promocao.validade}
              {"\n"}
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
              marginHorizontal: "1%",
            }}
            onPress={() => {}}
          >
            <Icon name={"remove"} size={30} color="#ff0000" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
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
          onPress={() => {}}
        >
          <Icon name={"add"} size={30} color="#01a699" />
        </TouchableOpacity>
      );
    }
  }

  return (
    <View>
      <ScrollView style={style.form}>
        {temImagem(prod.image)}
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Atualizar imagem{"\n"}</Text>
        </TouchableOpacity>
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
            setAddModalVisible(!addModalVisible);
          }}
        >
          <Icon name={"add"} size={30} color="#01a699" />
        </TouchableOpacity>
        <Text style={style.header}>Promoção</Text>
        {promocaoAtiva(prod.promo)}
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
              Alert.alert(
                "Remover produto",
                "Cuidado, essa ação irá remover o produto! Deseja continuar?",
                [
                  {
                    text: "CANCELAR",
                    onPress: () => console.log("CANCEL Pressed"),
                  },
                  {
                    text: "CONFIRMAR",
                    onPress: () => console.log("OK Pressed"),
                  },
                ],
                { cancelable: false }
              );
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
              Alert.alert(
                "Salvar alterações",
                "Deseja aplicar as alterações do Produto?",
                [
                  {
                    text: "CANCELAR",
                    onPress: () => console.log("CANCEL Pressed"),
                  },
                  {
                    text: "CONFIRMAR",
                    onPress: () => console.log("OK Pressed"),
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      </ScrollView>
      <View>
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

      <View>
        <Modal
          visible={addModalVisible}
          transparent={true}
          animationType="fade"
          marginTop="100"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text style={style.textView}>Adicionar Opicional</Text>
            <Text style={style.textadd}>Nome do adicional</Text>
            <Input
              placeholder="informe o nomedo adicional"
              rightIcon={{ type: "font-awesome", name: "edit" }}
            />
            <Text style={style.textadd}>Preço</Text>
            <Input
              placeholder="informe o custo do adicional"
              rightIcon={{ type: "font-awesome", name: "edit" }}
            />
            <Button
              style={{ marginBottom: 10 }}
              title="Salvar alterações"
              onPress={() => {
                setAddModalVisible(!addModalVisible);
              }}
            ></Button>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  modalAdicionar: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
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
  },
  buttonS: {
    marginHorizontal: "10%",
    marginBottom: 40,
    marginTop: 20,
    width: "40%",
    borderRadius: 50,
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
  textView: {
    margin: 5,
    fontSize: 26,
    fontWeight: "bold",
  },
  textadd: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
