///TENHA MEDO
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './src/Tabs/TabContainer/index.js';

import telaCadastro from './src/TelaCadastro/infoLogin.js';
import infoEndereco from './src/TelaCadastro/infoEndereco.js';
import ProdList from './src/Tabs/Itens/ProdList.js';
import CadastroProd from './src/Tabs/Itens/CadastroProd.js';
import EditarProd from './src/Tabs/Itens/EditarProd.js';
import EditarCat from './src/Tabs/Itens/EditarCat.js';
import CadastroCat from './src/Tabs/Itens/CadastroCat.js';

import Login from './src/TelaLogin/Login.js';

const Stack = createStackNavigator();

const MeuMenu = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        //initialRouteName = 'Login'
      >
        <Stack.Screen
          name="CadastroLogin"
          component={telaCadastro}
          options={{
            title: 'Cadastre-se',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#10d177',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="CadastroEndereco"
          component={infoEndereco}
          options={{
            title: 'Cadastre-se',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#10d177',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="LojistaNavigator"
          component={TabNavigator}
          options={{
            title: 'Lojista',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#27FB6B',
            },
            headerTitleStyle: {
              color: 'white',
              //alignSelf: 'center',
            },
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CadastroProd"
          component={CadastroProd}
          options={{
            title: 'Cadastro de Produto',
          }}
        />
        <Stack.Screen
          name="EditarProd"
          component={EditarProd}
          options={{
            title: 'Editar Produto',
          }}
        />
        <Stack.Screen
          name="CadastroCat"
          component={CadastroCat}
          options={{
            title: 'Cadastro de Categoria',
          }}
        />
        <Stack.Screen
          name="EditarCat"
          component={EditarCat}
          options={{
            title: 'Editar Categoria',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MeuMenu;

/*<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Login'
          component = {TabNavigator}
          options={{
            headerShown: false,
          }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>*/
