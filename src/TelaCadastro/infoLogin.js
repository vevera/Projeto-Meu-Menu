import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

/*const Campo = ({nome, setEstado}) =>{

    return (
        <View style = {styles.InputView}>
                <Text style = { styles.HeaderText}>
                    {nome}
                </Text>
                <TextInput 
                    style = {styles.InputText}
                />
        </View>
    );
}*/

import Campo from './campo.js';

const Separador = ({nome, padding}) => {
    return (
        <View style = {{width: "100%", paddingTop: padding}}>
            <View style = {styles.Separador}>
                <Text style = {styles.SeparadorText}>{nome}</Text>
            </View>
        </View>
    );
}

const InvalidPassWord = ({valid}) => {

    if(valid){

        return null;
    }
    else{

        return (

            <View style = {styles.InvalidPassWord}>
                <Text style = {styles.InvalidPassWordText}>Senhas Diferentes</Text>
            </View>

        );

    }

};


const telaCadastro = ({navigation}) => {

    const [nome, setNome] = useState("daniel");
    const [email, setEmail] = useState("danielemail");
    const [senha, setSenha] = useState("1234");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [validPassword,setValid] = useState(true);

    function insertLogin () {

        fetch(`http://192.168.1.103:5000/insert/fornecedor?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {method: 'POST'})
        .then(resposta => resposta.text())
        .then(article => {console.log(article)})

    };

    useEffect(() => {

        if(confirmarSenha != ""){

            if(senha != confirmarSenha){
                setValid(false); 
            }
            else{
                setValid(true);
            }

        }
        else{
            setValid(true);
        }

    },[senha,confirmarSenha])



    return (
        <SafeAreaView>
            <ScrollView>

                <Campo nome = 'Nome do Estabelecimento' setEstado = {setNome} secure = {false} iconName = 'cutlery'/>
                <Campo nome = 'Email' setEstado = {setEmail} secure = {false} iconName = 'envelope'/>
                <Campo nome = 'Senha' setEstado = {setSenha} secure = {true} iconName = 'lock' />
                <Campo nome = 'Confirmar Senha' setEstado = {setConfirmarSenha} secure = {true} iconName = 'lock'/>
                <InvalidPassWord valid = {validPassword}/>

                <View style = {styles.CadastrarView}>
                    <TouchableOpacity style = {styles.CadastrarButton} onPress = {() => {insertLogin(); navigation.navigate('LojistaNavigator');}}>
                        <Text style = {styles.CadastrarButtonText}>
                            Proximo
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
        
    );


}

export default telaCadastro;

styles = StyleSheet.create({

    CadastrarButton: {

        width: '60%',
        height: 40,
        backgroundColor: 'rgba(0,0,128,1)',
        borderRadius: 20,
        alignSelf: 'center',
    },

    CadastrarButtonText: {

        color: "white",
        fontSize: 20,
        alignSelf: 'center',
    },

    CadastrarView: {
        paddingTop: 50,
        paddingBottom: 10,
    },
    
    Separador: {
        width: "100%",
        height: 40,
        backgroundColor: 'rgba(0,0,128,1)',
    },
    SeparadorText: {

        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },

    InputText: {
        flex: 1,
        //width: "100%",
        //fontSize: 18,
       
        fontWeight: "100",
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
    InvalidPassWord: {

        alignSelf: 'center',
        alignItems: 'center'

    },
    InvalidPassWordText: {

       color: "red",
       fontWeight: 'bold',
       fontSize: 15,

    },
    EntrySection: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'gray', 
        borderWidth: 0.8,
        borderRadius: 20,
        height: 40,
    },
    EntryIcon: {

        paddingLeft: 10,
    },

})