import React, { useState } from "react";
import { TouchableOpacityBase } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Slider, Icon } from "react-native-elements";

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 300;

const SimpleModal = (props) => {
  const [mostrarValor, setMostrarValor] = useState(1);
  const [valor, setValor] = useState(1);
  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    //props.setData(data);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <TouchableOpacity disabled={true} style={StyleSheet.container}>
        <View style={styles.modal}>
          <View style={styles.textView}>
            <Text style={styles.textHeader}>Promoção</Text>

            <View
              style={{
                flex: 1,
                alignItems: "stretch",
                justifyContent: "center",
                marginHorizontal: "5%",
              }}
            >
              <Slider
                value={valor}
                maximumValue={100}
                minimumValue={1}
                step={1}
                onSlidingComplete={(value) => setMostrarValor(value)}
                onValueChange={(value) => setValor(value)}
                trackStyle={{
                  height: 10,
                  backgroundColor: "blue",
                  backgroundColor: "transparent",
                }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "transparent",
                }}
                thumbProps={{
                  children: (
                    <Icon
                      //name="heartbeat"
                      type="font-awesome"
                      size={10}
                      reverse
                      containerStyle={{ bottom: 10, right: 10 }}
                      color="lightblue"
                      //backgroundColor="#f50"
                    />
                  ),
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginBottom: 40,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Porcentagem de desconto: {valor}%
            </Text>
            <Text
              style={{
                marginBottom: 40,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Novo valor do produto: R$
              {(
                props.params.price -
                props.params.price * (valor / 100)
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => closeModal(false)}
            >
              <Text style={(styles.text, { color: "blue" })}>Aplicar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => closeModal(false)}
            >
              <Text style={(styles.text, { color: "blue" })}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 25,
    alignSelf: "center",
    margin: "2%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    //alignItems: "center",
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsView: {
    width: "100%",
    flexDirection: "row",
  },
  TouchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
});

export { SimpleModal };
