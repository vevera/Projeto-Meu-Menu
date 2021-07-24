import React from "react";
import { TouchableOpacityBase } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150;

const SimpleModal = (props) => {
  closeModal = (bool, data) => {
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
            <Text style={(styles.text, { fontSize: 20 })}>
              Sample model header
            </Text>
            <Text style={styles.text}>Sample model description</Text>
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => closeModal(false)}
            >
              <Text style={(styles.text, { color: "blue" })}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => closeModal(false)}
            >
              <Text style={(styles.text, { color: "blue" })}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
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
