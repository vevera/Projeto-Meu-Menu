import React from 'react';
import { View, Text} from 'react-native';
import AdicionarItem from './adicionarItem';

const OptionsHeader = ({title, Filho, buttonAdd, btnTitle, atualizarData, setAtualizarData, especialidesList}) => {

    return (
        <View style = {stylesInfoLoja.HeaderEspecialidades}>
            <Text style = {stylesInfoLoja.HeaderEspecialidadesText}>
                {title} 
            </Text>
            {buttonAdd && 
            <AdicionarItem 
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