import React, {useState} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import Campo from './campo.js';

export default function infoEndereco({navigation}){

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

    function passaAdiante(){

        if(testaCampo(pais) & testaCampo(cidade) & testaCampo(rua) & testaCampo(bairro)){

            navigation.navigate('LojistaNavigator');
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