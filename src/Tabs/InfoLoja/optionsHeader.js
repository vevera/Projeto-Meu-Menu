import React from 'react';
import { View, Text} from 'react-native';
import AdicionarItem from './adicionarItem';

const OptionsHeader = ({idLoja, title, Filho, buttonAdd, btnTitle, atualizarData, setAtualizarData, especialidesList}) => {

    return (
        <View style = {stylesInfoLoja.HeaderEspecialidades}>
            <Text style = {stylesInfoLoja.HeaderEspecialidadesText}>
                {title} 
            </Text>
            {buttonAdd && 
            <AdicionarItem
                idLoja = {idLoja}
                Componente = {Filho} 
                buttonTitle = {btnTitle} 
                atualizarData = {atualizarData} 
                setAtualizarData = {setAtualizarData}
                especialidesList = {especialidesList}
            />}
        </View>

    );

};

export default OptionsHeader;