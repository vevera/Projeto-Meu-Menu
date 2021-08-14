import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'react-native-elements';

import Home from "../Home/index.js";
import Itens from "../Itens/index.js";

import InfoLoja from "../InfoLoja/index.js";
import Endereco from "../Endereço/index.js";
import StackUsuarios from '../Cadastro Usuario Comum/usuariosStack.js';


const Tab = createBottomTabNavigator();

const TabNavigator = ({route}) =>{

    const idLoja = route.params;
    console.log(idLoja);

    return(
        <NavigationContainer independent= {true}>
            <Tab.Navigator
                screenOptions = {({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Inicio') {
                            iconName =  'home';
                        }
                        else if(route.name === 'Produtos'){

                            iconName = 'list';
                        }
                        else if(route.name === 'Informações'){
                            iconName = 'info-circle';
                        }
                        else if(route.name === 'Usuarios'){
                            iconName = 'user';
                        }
                        else if(route.name === 'Endereço'){
                            iconName = 'map-marker';
                        }
                        size = focused? 38: 27;

                        return <Icon  type='font-awesome' name = {iconName} size = {size} color = {color}/>
                    },
                })}
                tabBarOptions={{
                    showLabel: false,
                    style:{
                        height: 50,
                        paddingBottom: 5,
                        backgroundColor: '#f8f8ff',
                    },
                    
                    activeTintColor: '#18BC9C',
                    inactiveTintColor: 'black',
                }}
                
            >
                <Tab.Screen name = "Inicio" component = {Home} initialParams={{idLoja}}/>
                <Tab.Screen name = "Produtos" component = {Itens} initialParams={{idLoja}}/>
                <Tab.Screen name = "Informações" component = {InfoLoja} initialParams={{idLoja}}/>
                <Tab.Screen name = "Endereço" component = {Endereco} initialParams={{idLoja}}/>
                <Tab.Screen name = "Usuarios" component = {StackUsuarios} initialParams={{idLoja}}/>
                
            </Tab.Navigator>

        </NavigationContainer>
    );

}


export default TabNavigator;
