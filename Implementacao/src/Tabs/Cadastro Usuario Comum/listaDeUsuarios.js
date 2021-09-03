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


    
];

const Remove = () => {
    function removerAdicional() {
      console.log('remover opção adicional');
    }

    return (
      <View
        style={{flexDirection: 'column',justifyContent: 'center'}}>
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
            <View style={{marginHorizontal: 2}}>
                <View style={styleListaUsuario.fichaUsuarios}>
                    <Text style = {styleListaUsuario.textoUsuarios}>
                        <Text style = {{fontWeight: 'bold'}}>Nome:</Text> {usuario.nome}
                    </Text>
                    <Text style = {styleListaUsuario.textoUsuarios}>
                        <Text style = {{fontWeight: 'bold'}}>Email:</Text> {usuario.email}
                    </Text>
                </View>
            </View>
        </Swipeable>
        
    );

};


export default function ListaUsuariosComuns({navigation}) {

    const usuarios = DATA.map((item) => (
        <RenderUsuario key = {item.id} usuario = {item}/>
    ));
    
    return (
        
        <View style = {{backgroundColor: '#f8f8ff', flex: 1}}>
            <ScrollView>
                <View>
                    <View style  ={{flex: 1}}>
                        <View style = {{alignItems: 'center', backgroundColor: '#2c3e50', height: 60, justifyContent: 'center'}}>
                            <Text style =  {styleListaUsuario.headerText}>
                                Usuarios Cadastrados
                            </Text>
                        </View>

                        {usuarios}
                    </View>
                    <View >
                        <TouchableOpacity
                            style = {styleListaUsuario.botaoCadastro}
                            onPress={() => {navigation.navigate('CadastroUsuarios')}}>
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

    fichaUsuarios: { 
        backgroundColor: 'lightgrey', 
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10, 
        borderRadius: 10,
        borderBottomWidth: 1, 
        padding: 10,
        borderColor: '#188C9C'
    },

    textoUsuarios: {
        fontSize: 18,
        marginBottom: 4,
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
        marginTop: 10,
        marginRight: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    //2c3e50


});