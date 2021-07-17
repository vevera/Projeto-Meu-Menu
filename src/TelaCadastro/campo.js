import React from 'react';
import { View, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Campo({nome, setEstado, secure, iconName}){

    return (
        <View style = {styles.InputView}>
                <Text style = {styles.HeaderText}>
                    {nome}
                </Text>
                <View style = {styles.EntrySection}>
                    <Icon style = {styles.EntryIcon} name = {iconName} type = 'font-awesome' size = {16}/>
                    <TextInput 
                        style = {styles.InputText}
                        onChangeText = {(text) => {setEstado(text)}}
                    
                        secureTextEntry = {secure}
                    />
                </View>
        </View>
    );
}