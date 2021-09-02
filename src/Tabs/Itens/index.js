import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Aqui importamos as telas referentes a lista de categorias e produtos e do cadastro e atualização destas
import ProdList from './ProdList.js';
import CadastroProd from "./CadastroProd.js";
import EditarProd from "./EditarProd.js";
import EditarCat from "./EditarCat.js";
import CadastroCat from "./CadastroCat.js";

const Stack = createStackNavigator();

// Aqui temos as telas referentes aos itens/produtos e o NavigationContainer responsável pelo controle da navegação entre as telas 
export default function ProdutosNavigator({route}) {
    
    const idLoja = route.params.idLoja

    return (

    <NavigationContainer independent = {true}>
        <Stack.Navigator>
          <Stack.Screen
              name="ProdList"
              component={ProdList}
              options={({ navigation }) => {
                return {
                  title: "Categorias & Produtos",
                  headerShown: false,
                };
              }}
              initialParams={{idLoja, 'mudar': true}}
          />
          <Stack.Screen
            name="CadastroProd"
            component={CadastroProd}
            options={{
              title: "Cadastro de Produto",
            }}
          />
          <Stack.Screen
            name="EditarProd"
            component={EditarProd}
            options={{
              title: "Editar Produto",
            }}
          />
          <Stack.Screen
              name="CadastroCat"
              component={CadastroCat}
              options={{
              title: "Cadastro de Categoria",
          }}
          />
          <Stack.Screen
              name="EditarCat"
              component={EditarCat}
              options={{
              title: "Editar Categoria",
          }}
          />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
