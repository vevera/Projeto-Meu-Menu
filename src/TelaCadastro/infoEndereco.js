import React, {useState} from 'react'
import {Text, View} from 'react-native'
import Campo from './campo.js';

export default function infoEndereco(){

    const [estadoReg, setEstadoReg] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    
    const [bairro, setBairro] = useState("");

    

    return (
        <View>
            <Campo nome = 'Estado' setEstado = {setEstadoReg} secure = {false} iconName = 'lock'/>
            <Campo nome = 'Cidade' setEstado = {setCidade} secure = {false} iconName = 'lock' />
            <Campo nome = 'Rua' setEstado = {setRua} secure = {false} iconName = 'lock'/>
            <Campo nome = 'Bairro' setEstado = {setBairro} secure = {false} iconName = 'lock'/>
        </View>
    );

};