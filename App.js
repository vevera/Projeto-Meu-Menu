import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './src/Tabs/TabContainer/index.js';

import Login from './src/TelaLogin/Login.js';

const Stack = createStackNavigator();

// Componente principal do aplicativo, redireciona para a pagina da loja ao fazer login
const MeuMenu = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login">
        
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MeuMenu;

