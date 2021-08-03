import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import Campo from './campo.js';

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

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numeroDoTelegram, setNumeroDoTelegram] = useState("");

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [validPassword,setValid] = useState(true);

    const [aviso, setAviso] = useState(false);
    

    function testaCampo(campo){

        if(/[a-z0-9]/i.test(campo)){
            return true;
        }
        return false;

    }

    function passaAdiante(){

        if(testaCampo(nome) && testaCampo(email) && testaCampo(numeroDoTelegram) && testaCampo(senha) && validPassword){

            navigation.navigate('CadastroEndereco');
            setAviso(false);

        }
        else{

            setAviso(true);
        }

    }

    
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

                <Campo nome = 'Nome do Estabelecimento' setEstado = {setNome} secure = {false} iconName = 'cutlery' keyboardtype = 'default'/>
                <Campo nome = 'Email' setEstado = {setEmail} secure = {false} iconName = 'envelope' keyboardtype = 'default'/>
                <Campo nome = 'Número do Telegram' setEstado = {setNumeroDoTelegram} secure = {false} iconName = 'telegram' keyboardtype = 'phone-pad'/>
                <Campo nome = 'Senha' setEstado = {setSenha} secure = {true} iconName = 'lock' keyboardtype = 'default'/>
                <Campo nome = 'Confirmar Senha' setEstado = {setConfirmarSenha} secure = {true} iconName = 'lock' keyboardtype = 'default'/>
                
                {aviso && <Text style = {{alignSelf: 'center', marginTop: 5, fontSize: 16, color: 'red'}}>Campo(s) vazio(s) ou Senhas Diferentes</Text>}

                <View style = {styles.CadastrarView}>
                    <TouchableOpacity style = {styles.CadastrarButton} onPress = {passaAdiante}>
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
        backgroundColor: '#10d177',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    CadastrarButtonText: {

        color: "white",
        fontSize: 20,
        alignSelf: 'center',
    },

    CadastrarView: {
        marginTop: 20,
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
        width: '90%',
        //alignItems: 'center'

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