import React from "react";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";

const DATA = [
  {
    title: "Main dishes",
    descricao: "Aqui está a descrição do produto",
    data: [
      {
        name: "Pizza",
        price: 15,
        info: "Calabresa, queijo, tomate, pimenta",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Burguer",
        price: 12,
        info: "Carne, queijo, bacon",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Risotto",
        price: 12,
        info: "tradicional",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
    ],
  },
  {
    title: "Sides",
    descricao: "Aqui está a descrição do produto",
    data: [
      {
        name: "French Fries",
        price: 10,
        info: "batata, bacon, molho especial",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Onion Rings",
        price: 12,
        info: "Cebola, molho especial",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Fried Shrimps",
        price: 8,
        info: "Especial",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
    ],
  },
  {
    title: "Drinks",
    descricao: "Aqui está a descrição do produto",
    data: [
      {
        name: "Water",
        price: 3,
        info: "250ml, sem gás",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Coke",
        price: 4,
        info: "500ml",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Beer",
        price: 4,
        info: "250ml",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
    ],
  },
  {
    title: "Desserts",
    descricao: "Aqui está a descrição do produto",
    data: [
      {
        name: "Cheese Cake",
        price: 9,
        info: "queijo, bolo",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Ice Cream",
        price: 6,
        info: "Chocolate, morango e creme",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
      {
        name: "Fried Shrimps",
        price: 8,
        info: "Epecial",
        image:
          "https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg",
      },
    ],
  },
];

const Item = ({ title, image, info, price }) => (
  <View style={styles.item}>
    <Image
      style={styles.imagem}
      source={{
        uri: image,
      }}
    />
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitulo}>{info}</Text>
      <Text style={styles.subtitulo}>à partir de R$:{price}</Text>
    </View>
  </View>
);

export default (props) => {
  function Footer() {
    return (
      <View style={{ height: 40, width: "100%" }}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.navigation.navigate("CadastroProd")}
        >
          <Icon name="add" size={30} color="red" />
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Adicionar Produto
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function FooterCat() {
    return (
      <View style={{ height: 40, width: "100%" }}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.navigation.navigate("CadastroCat")}
        >
          <Icon name="add" size={30} color="red" />
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Adicionar Categoria
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("EditarProd", item)}
                //style={styles.item}
              >
                <View>
                  <Item
                    title={item.name}
                    image={item.image}
                    info={item.info}
                    price={item.price}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ backgroundColor: "#036d19", height: 50 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("EditarCat", title)}
              >
                <Text style={styles.header}>{title}</Text>
              </TouchableOpacity>
            </View>
          )}
          renderSectionFooter={Footer}
          ListFooterComponent={FooterCat}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",
    //marginHorizontal: "1%",
    flex: 0,
    backgroundColor: "white",
    //paddingTop: StatusBar.currentHeight,
    //marginHorizontal: 12,
  },
  item: {
    //alignItems: "center",
    //marginHorizontal: 4,
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    width: "95%",
    height: 80,
    alignSelf: "center",
  },
  subtitulo: {
    fontWeight: "bold",
    color: "grey",
  },
  header: {
    //marginTop: "2%",
    marginHorizontal: "2%",
    marginBottom: "2%",
    width: "100%",
    //textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    //height: 50,
    //backgroundColor: "#036d19",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imagem: {
    marginHorizontal: "2%",
    alignSelf: "flex-end",
    width: 80,
    height: "90%",
    borderRadius: 10,
  },
});
