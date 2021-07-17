import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

export default ({navigation}) => {
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image
          style={{
            width: 170,
            height: 155,
          }}
          source={require("../../assets/Op_1.png")}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity
          style={styles.btnsubmit}
          onPress={() => navigation.navigate("ProdList")}
        >
          <Text style={styles.textsubmit}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = { () => {navigation.navigate("CadastroLogin")}} style={styles.btnregister}>
          <Text style={styles.textregister}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10d177",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
    width: "90%",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnsubmit: {
    backgroundColor: "#35aaff",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  textsubmit: {
    color: "#fff",
    fontSize: 18,
  },
  btnregister: {
    marginTop: 10,
  },
  textregister: {
    color: "#fff",
  },
});
