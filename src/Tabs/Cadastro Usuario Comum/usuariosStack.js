import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListaUsuariosComuns from './listaDeUsuarios';
import CadastroUsuarioComum from './index';

const Stack = createStackNavigator();

export default function StackUsuarios() {

    return (
        <NavigationContainer independent = {true}>
            <Stack.Navigator
        
                initialRouteName="ListaUsuarios"
            >
                <Stack.Screen
                    name="ListaUsuarios"
                    component={ListaUsuariosComuns}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CadastroUsuarios"
                    component={CadastroUsuarioComum}
                    options={{
                        headerShown: true,
                        title: 'Cadastro de Usuários',
                        headerStyle: {
                            backgroundColor: '#188C9C',
                          },
                          headerTitleStyle: {
                            color: 'white',
                          },
                          headerTintColor: 'white',
                    }}
                    //188696
                    
                />
        
            </Stack.Navigator>
        </NavigationContainer>
    )
}