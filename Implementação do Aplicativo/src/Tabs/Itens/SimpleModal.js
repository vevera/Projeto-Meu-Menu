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
import { atualizarPromocao } from "../../conn/produtos";
import * as data from '../../connection.json'; // importamos aqui os dados do banco para podermos fazer a comunicação

// Aqui serão setadas as proporções do modal tendo como referencia o tamanho da tela do celular

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 300;

// SimpleModal é o modal que vai ser chamado em EditarProd quando formos fazer a edição ou cadastro de uma promoção

const SimpleModal = (props) => {

  // Vamos pegar o preco e o preco promocional que está em props para podermos fazer as atualizações necessarias
  
  const price = props.params.promotional_price != null? props.params.promotional_price : props.params.price;

  const [mostrarValor, setMostrarValor] = useState(1);

  const [valor, setValor] = useState(100 - ((price * 100)/props.params.price));
  const [novoValorPromocional, setNovoValorPromocional] = useState(price);
  const idProduto = props.params.id;

  // Caso seja clicado algum botão é chamado ecloseModal que fecha o modal
  const closeModal = (bool) => {
    props.changeModalVisible(bool);
  };

  // Aqui vamos ter a parte que será retornada e visualizada pelo usuário
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

              <Slider /* Aqui temos un slider que conseguimos definir a porcentagem da promoção em um certo produto */
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
            
            <Text /* Temos aqui mostrando para o usuario o preco atualizando na medida que o slider é atualizado */
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

          <View style={styles.buttonsView}  /* Nessa view temos dois touchableOpacity (botões) um escrito Aplicar e outro Cancelar*/ >
            
            <TouchableOpacity /* Esse primeiro botão serve para salvar as alterações chamando as funções atualizarPromocao() e closeModal alem de props.setAtualizar  */
              style={styles.TouchableOpacity}
              onPress={() => {
                atualizarPromocao(props.idLoja, novoValorPromocional, idProduto);
                console.log(novoValorPromocional, "->>",valor);
                closeModal(false);
                props.setAtualizar(props.atualizarPromo);
              }}
            >
              <Text style={(styles.text, { color: "blue" })}>Aplicar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity /* Esse segundo botão é referente ao cancelamento da acao fechando o modal */
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

// Aqui fica o estilo do modal que será chamado no codigo acima com a const styles
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
