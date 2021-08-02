import React, { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import { View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';

const AdicionarItem = ({Componente, buttonTitle, setAtualizarData, atualizarData, especialidesList}) => {

    const [modalAtiva, setModalAtiva] = useState(false);
    return (

    <View style = {{height: 50,paddingTop: 10}}>

        <Modal
            animationType = 'fade'
            transparent = {true}
            visible = {modalAtiva}
            onRequestClose={() => {
                
                setModalAtiva(!modalAtiva);
              }}    
        >
            <View style={stylesInfoLoja.ModalCentralizado}>
                <View style = {stylesInfoLoja.ModalView}>
                    <Componente 
                        setModalAtiva = {setModalAtiva} 
                        modalAtiva = {modalAtiva} 
                        setAtualizarData = {setAtualizarData} 
                        atualizarData = {atualizarData} 
                        especialidadesAtuais = {especialidesList}
                    />
                </View>
            </View>
        </Modal>
        <TouchableOpacity 
            style = {stylesInfoLoja.AdicionarHorarioAtendimentoBotao}
            onPress ={() => {setModalAtiva(!modalAtiva)}}
        >
            <Icon name = 'plus' type = 'antdesign' size = {29} color = '#228b22'/>
        </TouchableOpacity>
        
    </View>
    )

};

export default AdicionarItem;