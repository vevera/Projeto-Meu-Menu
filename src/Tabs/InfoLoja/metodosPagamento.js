import React, {useState } from 'react';
import { TextInput , Image} from 'react-native';
import { View, SafeAreaView, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { Switch } from 'react-native';

import OptionsHeader from './optionsHeader';


//Render dos seguintes metodos de pagamento: Cartão de Credito, Cartão de Debito e Dinheiro
const RenderMetodoDePagamento = ({texto, iconName, color}) => {
    const [switchOn, setSwitchOn] = useState(false);
        
    return (
        <View style = {{alignItens: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 70, paddingBottom: 15}}>
            <View style = {stylesInfoLoja.MetodosDePagementoContainer}>
                
                <Icon
                    style = {{marginLeft: 10, width: 50}}
                    name = {iconName}
                    type = 'font-awesome'
                    size = {30}
                    color = {color}
                />
                
                <Text style = {stylesInfoLoja.TextoMetodoDePagamento}>{texto}</Text>

            </View>
            <Switch
                style = {{marginRight: 10}} 
                thumbColor = {switchOn? 'green' : 'gray'}
                onValueChange = {() => {setSwitchOn((prevVal) => !prevVal)}}
                value = {switchOn}
            />
        </View>
    );
}

//Renderiza apenas o metodo pix pois este contem algumas diferenças, como o uso de Imagem ao invez de um Icon
const RenderMetodoDePagamentoPix = ({texto}) => {

    const [switchOn, setSwitchOn] = useState(false);
    const [chave, setChave] = useState('12345678');
    const [editable, setEditable] = useState(false);
    const iconName = editable? 'check' : 'edit';

    return (
        <View style = {{paddingBottom: 15}}>
            <View style = {{alignItens: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 70}}>
                <View style = {stylesInfoLoja.MetodosDePagementoContainer}>
                    <View style = {{marginLeft: 10,width: 50, alignItems: 'center'}}>
                        <Image
                            style={{width: 30, height: 30}}
                            source={require('../../../assets/pix.png')}
                        />
                    </View> 
                    <Text style = {stylesInfoLoja.TextoMetodoDePagamento}>{texto}</Text>
                </View>
                <Switch
                    style = {{marginRight: 10}} 
                    thumbColor = {switchOn? 'green' : 'gray'}
                    onValueChange = {() => {setSwitchOn((prevVal) => !prevVal)}}
                    value = {switchOn}
                />
            </View>
            {switchOn && <View>
                <Text style = {{marginLeft: 30, fontSize: 15.6, alignSelf: 'flex-end', width: '80%'}}>Digite uma chave Pix: </Text>
                <View style = {stylesInfoLoja.ChavePixView}>
                    <TextInput
                        style = {{fontSize: 16, color: '#b13b46', flex: 1}}
                        placeholder = 'Digite...'
                        defaultValue = {chave}
                        editable= {editable}
                    />
                    <Icon  
                        color = 'green' 
                        name = {iconName} 
                        font = 'font-awesome' 
                        size = {27} 
                        onPress = {() => {setEditable(!editable)}}
                    />
                </View>
            </View>}

        </View>
    );

}

//Renderiza todos os metodos de pagamentos juntos
const MetodosDePagemento = () => {


    return (

        <SafeAreaView>
            <RenderMetodoDePagamento texto = 'Cartão de Credito' iconName = 'credit-card-alt' color = 'blue'/>
            <RenderMetodoDePagamento texto = 'Cartão de Debito' iconName = 'credit-card-alt' color = 'red'/>
            <RenderMetodoDePagamento texto = 'Dinheiro' iconName = 'money' color = 'green'/>
            <RenderMetodoDePagamentoPix texto = 'Pix'/>
        </SafeAreaView>

    );
};

//Renderiza os metodos de pagamento e um header
const MetodosDePagementoSection = () => {

    return (
        <SafeAreaView>
            <OptionsHeader title = 'Metodos de Pagamento' buttonAdd = {false}/>
            <MetodosDePagemento />
        </SafeAreaView>
    );

}

export default MetodosDePagementoSection;