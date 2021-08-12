import React, {useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native';
import {Text, View, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import {Icon} from 'react-native-elements';
import * as data from '../../connection.json';


const CampoDoEndereco = ({nome, setEstado, secure, defaultVal}) => {

    const [editable, setEditable] = useState(false);
    const color = editable? "green": "black";
    return (
        <View style = {styleEndereco.InputView}>
                <Text style = {styleEndereco.HeaderText}>
                    {nome}
                </Text>
                <View style = {styleEndereco.EntrySection}>

                    <TextInput 
                        defaultValue = {defaultVal}
                        editable={editable}
                        style = {styleEndereco.InputText}
                        onChangeText = {(text) => {setEstado(text)}}
                    
                        secureTextEntry = {secure}
                    />
                    <Icon 
                        style = {styles.IconStyle} 
                        name = 'pencil' 
                        
                        color = {color}
                        type = 'font-awesome'
                        size = {20}
                        onPress = {()=>{setEditable(!editable)}}
                         /> 
                </View>
        </View>
    );
};

export default function Endereco({route}) {

    const idLoja = route.params.idLoja

    const [pais, setPais] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    const [mudarEndereco, setMudar] = useState(false);

    async function GetAddress(){

        fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/address`, {method: 'GET'})
        .then(resposta => resposta.json())
        .then((resposta) => resposta.response)
        .then((article) => {
            setPais(article.adress_country);
            setCidade(article.adress_city);
            setRua(article.adress_street);
            setBairro(article.adress_borough);
        })
        .catch(error  => console.log(error))

    }

    useEffect(() => {

        GetAddress();

    }, [mudarEndereco])

    


    async function UpdateAddress(){

        fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/address`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                adress_country: pais, 
                adress_city: cidade, 
                adress_borough: rua, 
                adress_street: bairro,
        })
        })
        .then(resposta => resposta.text())
        .then(article => {console.log(article)})
        .catch(error  => console.log(error))

    }

    return (

        <View style = {styleEndereco.EnderecoContainer}>

            <View style = {{width:"100%",paddingTop: 20}}>
                <CampoDoEndereco nome = 'País' setEstado = {setPais} secure = {false} defaultVal = {pais}/>
                <CampoDoEndereco nome = 'Cidade' setEstado = {setCidade} secure = {false} defaultVal = {cidade}/>
                <CampoDoEndereco nome = 'Rua' setEstado = {setRua} secure = {false} defaultVal = {rua}/>
                <CampoDoEndereco nome = 'Bairro' setEstado = {setBairro} secure = {false} defaultVal = {bairro}/>
            
            </View>
            
            <View style = {styleEndereco.BotaoEditar}>

                <TouchableOpacity
                onPress = {() => {
                    UpdateAddress(); 
                    ToastAndroid.show(
                        "Endereço Atualizado!", 
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        10,
                        50
                    );
                }} 
                style = {styleEndereco.BotaoEditarTouchable}>
                    <Text style = {styleEndereco.BotaoEditarText}>Salvar</Text>

                </TouchableOpacity>

            </View>

        </View>
    );

};

styleEndereco = StyleSheet.create({
    Title: {
        fontSize: 30,
        paddingBottom: 30,
        paddingTop: 20,
        fontWeight: 'bold',
    
    },
    EnderecoContainer: {
        flex: 4,
        width: "100%",
        height: "100%",
        flexDirection: 'column',
    },
    InputView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    HeaderText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    EntrySection: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row', 
        borderBottomColor: "black",
        borderBottomWidth: 1.3,
        height: 40,
    },
    InputText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '100',
        color: "black",
    
    },
    IconStyle: {
        
       // paddingRight: 10,
        //paddingBottom: 20,
    },

    BotaoEditar: {
        
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center', 
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
      
    },
    BotaoEditarTouchable: {
        width: "100%",
        backgroundColor: "orange",
        height: 40,
        alignSelf: 'flex-end',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: "black",
        

    },
    BotaoEditarText: {
        color: "black",
        fontSize: 23,
        fontWeight: 'bold',

    },

    BotaoSalvar: {
        paddingTop: 20,
        paddingLeft: 10,
        width: "50%",
       
        
        
    },
    BotaoSalvarTouchable: {

        backgroundColor: "green",
        height: 40,
        width: "100%",
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: "black",

    },
    BotaoSalvarText: {
        color: "black",
        fontSize: 23,
        fontWeight: 'bold',

    },

});

// Endereco;