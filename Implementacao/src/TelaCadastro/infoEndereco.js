import React, {useState} from 'react'
import {Text, View, TouchableOpacity, Alert} from 'react-native'
import Campo from './campo.js';
import login from './loginConnection.js';

export default function infoEndereco({route, navigation}){

    const params = route.params;
    console.log(params);

    const [aviso, setAviso] = useState(false);

    const [pais, setPais] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    
    function testaCampo(campo){

        if(/[a-z0-9]/i.test(campo)){
            return true;
        }
        return false;

    }

    async function passaAdiante(){

        if(testaCampo(pais) & testaCampo(cidade) & testaCampo(rua) & testaCampo(bairro)){
            
            login(
                params.name,
                params.phone,
                params.email,
                params.password,
                [],
                pais,
                cidade,
                bairro,
                rua
            )
            .then((resp) => {resp? Alert.alert("Sucesso!", "Cadastro concluido!"):Alert.alert("Falha!", "Não foi possivel concluir o cadastro!")});
            await navigation.navigate('Login');
             
            setAviso(false);

        }
        else{

            setAviso(true);
        }

    }

    return (
        <View>
            <Campo nome = 'País' setEstado = {setPais} secure = {false} iconName = 'map'/>
            <Campo nome = 'Cidade' setEstado = {setCidade} secure = {false} iconName = 'map' />
            <Campo nome = 'Rua' setEstado = {setRua} secure = {false} iconName = 'map'/>
            <Campo nome = 'Bairro' setEstado = {setBairro} secure = {false} iconName = 'map'/>

            <View style = {{minHeight: 50}}>

                {aviso && <Text style = {{alignSelf: 'center', marginTop: 30, fontSize: 18, color: 'red'}}>Todos os campos precisam estar preenchidos!</Text>}

            </View>
            
            <View style = {styles.CadastrarView}>
                <TouchableOpacity style = {styles.CadastrarButton} onPress = {passaAdiante}>
                    <Text style = {styles.CadastrarButtonText}>
                        Concluido!
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );

};