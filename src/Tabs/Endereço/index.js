import React, {useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native';
import {Text, View, TextInput, ToastAndroid} from 'react-native'
import {Icon} from 'react-native-elements';
import { Get , Update} from '../../conn/endereco';
import {styleEndereco} from './enderecoStyle';


//Renderiza um campo como (Pais, Cidade, Rua, Bairro)
const CampoDoEndereco = ({nome, setEstado, secure, defaultVal}) => {

    const [editable, setEditable] = useState(false);
    const color = editable? "#188C9C": "black";
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
                        style = {styleEndereco.IconStyle} 
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

//Retorna o endereço de uma loja com a opção de muda-lo
export default function Endereco({route}) {

    const idLoja = route.params.idLoja

    /*Endereço de uma loja, são inicializados com "" mas
    serão atribuidos ao endereço cadastrado no banco de dados*/

    const [pais, setPais] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    const [mudarEndereco, setMudar] = useState(false);

    //Recupera o endereço de uma loja
    async function GetAddress(){

        Get(idLoja)
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

    //Atualiza o endereço de uma loja
    async function UpdateAddress(){

        Update(idLoja, pais, cidade, rua, bairro);

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