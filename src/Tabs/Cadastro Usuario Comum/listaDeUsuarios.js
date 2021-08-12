import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';



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
 {

    id: 4,
    nome: 'Joaquim',
    email: 'Joaquim@gmail',
    senha: '123',
 
     
 },
 {
 
     id: 5,
     nome: 'Joaquina',
     email: 'Joaquina@gmail',
     senha: '123',
  
      
  },

    
];

const Remove = () => {
    function removerAdicional() {
      console.log('remover opção adicional');
    }

    return (
      <View
        style={{flexDirection: 'column',justifyContent: 'center',backgroundColor: '#f8f8ff',}}>
        <TouchableOpacity
          style={styleListaUsuario.lixeira}
          onPress={removerAdicional()}>
          <Icon type="font-awesome" name="trash" size={45} color="white" />
        </TouchableOpacity>
      </View>
    );
};
const RenderUsuario = ({usuario}) => {

    return (

        <Swipeable
            style = {{}}
            renderRightActions = {Remove}
            rightThreshold = '50'
            
        >
            <View style={{ backgroundColor: '#f8f8ff', marginTop: 2, borderBottomWidth: 0.5, padding: 10}}>
                <Text style = {styleListaUsuario.textoUsuarios}>
                    <Text style = {{fontWeight: 'bold'}}>Nome:</Text> {usuario.nome}
                </Text>
                <Text style = {styleListaUsuario.textoUsuarios}>
                    <Text style = {{fontWeight: 'bold'}}>Email:</Text> {usuario.email}
                </Text>
            </View>
        </Swipeable>
        
    );

};


export default function ListaUsuariosComuns({navigation}) {

    const usuarios = DATA.map((item) => (
        <RenderUsuario key = {item.id} usuario = {item}/>
    ));
    
    return (
        
        <View style = {{backgroundColor: 'white'}}>
            <ScrollView>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View>
                        <View style = {{alignItems: 'center', backgroundColor: '#2c3e50'}}>
                            <Text style =  {styleListaUsuario.headerText}>
                                Usuarios Cadastrados
                            </Text>
                        </View>

                        {usuarios}
                    </View>
                    
                    <View style={{backgroundColor: '#f8f8ff'}}>
                        <TouchableOpacity
                            style = {styleListaUsuario.botaoCadastro}
                            onPress={() => {navigation.navigate('CadastroUsuarios')}}
                        >
                            <View>
                                <Text style={styleListaUsuario.textoBotao}>
                                    Cadastrar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
            </ScrollView>
            
        </View>
    );

};

const styleListaUsuario = StyleSheet.create({

    textoUsuarios: {
        fontSize: 18,
        marginBottom: 3,
        marginLeft: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 4,
        color: 'white',

    },
    botaoCadastro: {
        marginTop: 20,
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
    lixeira: {
        backgroundColor: 'red',
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
    },
    //2c3e50


});