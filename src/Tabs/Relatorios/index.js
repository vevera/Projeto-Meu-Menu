import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Relatorio = () =>{

    return(

        <View style={styles.container}>
            <Text style = {styles.texto}>OLA RELATORIO</Text>
            
        </View>
    );
}

export default Relatorio;

styles = StyleSheet.create({

    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    texto: {
    },

});