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

import * as data from '../../connection.json';

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 300;

const SimpleModal = (props) => {

  const price = props.params.promotional_price != null? props.params.promotional_price : props.params.price;

  const [mostrarValor, setMostrarValor] = useState(1);

  const [valor, setValor] = useState(100 - ((price * 100)/props.params.price));
  const [novoValorPromocional, setNovoValorPromocional] = useState(price);
  const idProduto = props.params.id;

  
  const closeModal = (bool) => {
    props.changeModalVisible(bool);
   
  };

  console.log("ajsholajbsidloja: ",props.idLoja);

  function atualizarPromocao() {

    fetch(
      `${data.endereco}store/${props.idLoja}/promotion`,
      {
        method: 'PUT',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          promotional_price: novoValorPromocional,
          product_id: idProduto,
        }),
      },
    )
    .then(resposta => resposta.text())
    .then(resposta => console.log(resposta))
    .catch(error => console.log(error));
  }

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
                onValueChange={(value) => {setValor(value); setNovoValorPromocional(props.params.price - (props.params.price * (value / 100)))}}
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
                      type="font-awesome"
                      size={10}
                      reverse
                      containerStyle={{ bottom: 10, right: 10 }}
                      color="lightblue"
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
              Porcentagem de desconto: {valor.toFixed(0)}%
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
              onPress={() => {
                atualizarPromocao();
                console.log(novoValorPromocional, "->>",valor);
                closeModal(false);
                props.setAtualizar(props.atualizarPromo);
              }}
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
