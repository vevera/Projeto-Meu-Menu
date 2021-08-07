import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Campo from './campo.js'

export default function CadastroUsuarioComum(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    

    return (
        <View style = {{height: '100%', justifyContent: 'space-between'}}>
            <View>
                <View style = {{marginTop: 25}}> 
                    <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
                        Cadastro de Usuário
                    </Text>
                </View>
        
                <View>
            
                    <Campo nome = 'Nome:' setEstado = {setNome} secure = {false} iconName = 'lock' /> 
                    <Campo nome = 'Email:' setEstado = {setEmail} secure = {false} iconName = 'lock' /> 
                    <Campo nome = 'Senha:' setEstado = {setSenha} secure = {false} iconName = 'lock' />    
                
                </View>
            </View>
            <TouchableOpacity
                onPress={()=> {}}
                style = {styleCadastroUsuario.botaoCadastro}
            >
                <View>
                    <Text style={styleCadastroUsuario.textoBotao}>
                        Adicionar
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styleCadastroUsuario = StyleSheet.create({

    botaoCadastro: {
        alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 20, 
        backgroundColor: '#188C9C', 
        width: '60%',
        height: 40,
        borderRadius: 50
    },
    textoBotao: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },

});







