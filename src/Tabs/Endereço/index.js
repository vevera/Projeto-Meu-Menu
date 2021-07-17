import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native';
import {Text, View, StyleSheet, TextInput} from 'react-native'
import {Icon} from 'react-native-elements';


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

export default function Endereco() {

    const [estadoReg, setEstadoReg] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    
    const [bairro, setBairro] = useState("");
    return (
        <View style = {styleEndereco.EnderecoContainer}>

            
            <View style = {{width:"100%",paddingTop: 20}}>
                <CampoDoEndereco nome = 'Estado' setEstado = {setEstadoReg} secure = {false} defaultVal = 'Ceara'/>
                <CampoDoEndereco nome = 'Cidade' setEstado = {setCidade} secure = {false} defaultVal = 'Cascavel'/>
                <CampoDoEndereco nome = 'Rua' setEstado = {setRua} secure = {false} defaultVal = 'Rua das Lurdes'/>
                <CampoDoEndereco nome = 'Bairro' setEstado = {setBairro} secure = {false} defaultVal = 'Rio Novo'/>
            
            </View>
            
            <View style = {styleEndereco.BotaoEditar}>

                <TouchableOpacity
                //onPress = {() => {setSalvarAtivo(true)}} 
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
        //backgroundColor: "blue",
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
        //borderColor: "none",
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