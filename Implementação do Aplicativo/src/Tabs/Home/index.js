import React from 'react';
import { View, Text } from 'react-native';
//import { Icon } from 'react-native-elements'


const Home = ({route}) =>{

    const idLoja = route.params;
    console.log(idLoja);

    return(

        <View>

            <Text> {idLoja.idLoja} </Text>

        </View>
    );
}

export default Home;