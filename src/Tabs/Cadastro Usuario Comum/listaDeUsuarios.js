import React, {useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';


const DATA = [


{

   id: 1,
   nome: 'Joaquim',
   email: 'Joaquim@gmail',
   senha: '123',

    
},
{

    id: 2,
    nome: 'Joaquina',
    email: 'Joaquina@gmail',
    senha: '123',
 
     
 },
 {

    id: 3,
    nome: 'Marcus',
    email: 'Marcus@gmail',
    senha: '123',
 
     
 },

    
];


const RenderUsuario = ({usuario}) => {

    return (

        <View style={{backgroundColor: 'lightgrey'}}>
            <Text>
                Nome: {usuario.nome}
            </Text>
            <Text>
                Email: {usuario.email}
            </Text>
            <Text>
                Senha: {usuario.senha}
            </Text>
        </View>

    );

};


export default function ListaUsuariosComuns() {

    const usuarios = DATA.map((item) => (
        <RenderUsuario key = {item.id} usuario = {item}/>
    ));
    
    return (
        
        <View>
            {usuarios}
        </View>
    );

};