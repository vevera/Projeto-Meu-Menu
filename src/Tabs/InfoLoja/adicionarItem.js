import React, { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import { View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';


// Modal onde ficam as componente de adicionar especialidade e horario de atendimento
const AdicionarItem = ({idLoja, Componente, buttonTitle, setAtualizarData, atualizarData, especialidesList}) => {

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
                        /* Componente pode ser tanto o NovoHorarioAtendimento do arquivo horarioAtendimento.js
                        quanto NovaEspecialideComponent do arquivo especialidades.js*/
                        idLoja = {idLoja}
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
            <Icon name = 'plus' type = 'antdesign' size = {29} color = 'white'/>
        </TouchableOpacity>
        
    </View>
    )

};

export default AdicionarItem;