import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'react-native-elements';

import Home from "../Home/index.js";
import Itens from "../Itens/index.js";

import InfoLoja from "../InfoLoja/index.js";
import Endereco from "../Endereço/index.js";


const Tab = createBottomTabNavigator();

const TabNavigator = () =>{

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
                            iconName = 'sticky-note';
                        }

                        return <Icon  type='font-awesome' name = {iconName} size = {size} color = {color}/>
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name = "Inicio" component = {Home}/>
                <Tab.Screen name = "Produtos" component = {Itens}/>
                <Tab.Screen name = "Informações" component = {InfoLoja}/>
                <Tab.Screen name = "Endereço" component = {Endereco}/>
            </Tab.Navigator>

        </NavigationContainer>
    );

}


export default TabNavigator;
