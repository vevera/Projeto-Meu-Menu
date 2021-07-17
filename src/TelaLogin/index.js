import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

const telaLogin = ( ) => {

    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                LOGO
            </Text>

            <View style = {styles.inputView}>
                <TextInput
                    style = {styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(emailText) => setEmail(emailText)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style = {styles.inputText}
                    placeholder="Senha..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(senhaText) => setSenha(senhaText)}
                />
            </View>

            <TouchableOpacity style={styles.botaoEntrar}>
                <Text style = {styles.entrarText}>Entrar</Text>
            </TouchableOpacity>

            <View style = {styles.cadastroView}>

                <Text style = {styles.cadastroPerguntaText}>Ainda não é parceiro?</Text>
                <TouchableOpacity style = {styles.cadastroBotao}>
                    <Text style = {styles.cadastroTexto}>Cadastre-se</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default telaLogin;


styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",

    },
    logo: {

        fontWeight: "bold",
        fontStyle: ("normal","italic"),
        fontSize: 100,
        color: "rgba(0,0,205,1)",
        marginBottom: 50,

    },
    inputView: {

        width: "80%",
        backgroundColor: "rgba(0,0,205,0.1)",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 10,
    },
    inputText: {
        fontSize: 15,
        height: 50,
        color: "black",
    },
    entrarText: {
        fontSize: 19,
        color: "white",
        fontWeight: "bold",
    },
    botaoEntrar: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },

    cadastroView: {
        width: "58%",
        height: 30,
        //backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    cadastroBotao: {
        //backgroundColor: 'gray',
        //alignSelf: "space-between",
    },

    cadastroPerguntaText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "black",
        //alignSelf: "space-between",
    },

    cadastroTexto: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: "blue",
        //alignSelf: "space-between",
    },

})