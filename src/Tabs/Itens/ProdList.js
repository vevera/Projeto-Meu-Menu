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

const DATA = [
  {
    title: "Main dishes",
    data: [
      {
        name: "Pizza",
        price: 15,
      },
      {
        name: "Burguer",
        price: 12,
      },
      {
        name: "Risotto",
        price: 12,
      },
    ],
  },
  {
    title: "Sides",
    data: [
      {
        name: "French Fries",
        price: 10,
      },
      {
        name: "Onion Rings",
        price: 12,
      },
      {
        name: "Fried Shrimps",
        price: 8,
      },
    ],
  },
  {
    title: "Drinks",
    data: [
      {
        name: "Water",
        price: 3,
      },
      {
        name: "Coke",
        price: 4,
      },
      {
        name: "Beer",
        price: 4,
      },
    ],
  },
  {
    title: "Desserts",
    data: [
      {
        name: "Cheese Cake",
        price: 9,
      },
      {
        name: "Ice Cream",
        price: 6,
      },
      {
        name: "Fried Shrimps",
        price: 8,
      },
    ],
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function func(aux) {
  return "  -  R$" + aux;
}

export default (props) => {
  function Footer() {
    return (
      <View>
        <Button
          onPress={() => props.navigation.navigate("CadastroProd")}
          type="clear"
          title="Adicionar Produto"
          icon={<Icon name="add" size={30} color="red" />}
        />
      </View>
    );
  }
  function FooterCat() {
    return (
      <View>
        <Button
          onPress={() => props.navigation.navigate("CadastroCat")}
          type="clear"
          title="Adicionar Categoria"
          icon={<Icon name="add" size={30} color="red" />}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditarProd", item)}
            >
              <Item title={item.name + func(item.price)} />
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "8%",
    flex: 0,
    backgroundColor: "white",
    //paddingTop: StatusBar.currentHeight,
    //marginHorizontal: 12,
  },
  item: {
    //alignItems: "center",
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: "#f8f8ff",
    borderRadius: 8,
    width: "95%",
    height: 80,
    alignSelf: "center",
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
  title: {
    fontSize: 20,
  },
});
