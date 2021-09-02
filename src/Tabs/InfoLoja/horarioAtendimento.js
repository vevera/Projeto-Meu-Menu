import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity} from 'react-native';
import { View, SafeAreaView, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { Swipeable } from 'react-native-gesture-handler';
import OptionsHeader from './optionsHeader';
import {adicionarHorario, deletaHorario, setaDadosHorario} from '../../conn/horarioAtendimento.js';


//TimePicker usado na escolha dos Horarios de Atendimento
const TimePicker = ({setTime,texto}) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setIsDisabled(true);
        setTime(currentDate);
      };
    return (
        <View>
            {(!isDisabled) && <RNDateTimePicker is24Hour = {true} mode = 'time' value={new Date()} onChange = {onChange}/>}
            <TouchableOpacity style = {stylesInfoLoja.TimePickerStyle} onPress = {() => setIsDisabled(false)}>
                <Text style = {stylesInfoLoja.TimePickerTextStyle}>{texto}</Text>
                <Icon name = 'clock-o' type = 'font-awesome' size ={20}/>
            </TouchableOpacity>
        </View>
    );
};

//Renderiza um picker, onde pode ser escolhido de segunda a domingo
const DiaPicker = ({valorSelecionado,setValorSelecionado, texto}) => {

    return (

        <View style = {stylesInfoLoja.StyleDataPickerContainer}>
            <Text style = {{fontSize: 17, fontWeight: 'bold', color: '#3d2b1f'}}>{texto} </Text>
            <Picker
                style = {stylesInfoLoja.DiaPickerStyle}
                mode = 'dropdown'
                selectedValue = {valorSelecionado}
                onValueChange = {(itemValue, itemIndex) => setValorSelecionado(itemValue)}
            >
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Segunda' value = {1}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Terça' value = {2}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Quarta' value = {3}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Quinta' value = {4}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Sexta' value = {5}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Sabado' value = {6}/>
                <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Domingo' value = {7}/>
            </Picker>
        </View>

    );

};


//Renderiza a componente onde será possivel adicionar os dias e hoarios de funcionamento
const NovoHorarioAtendimento = ({idLoja, setModalAtiva, modalAtiva, setAtualizarData, atualizarData}) => {
    const [diaInicio, setDiaInicio] = useState(1);
    const [diaFim, setDiaFim] = useState(2);

    const [horaInicio, setHoraInicio] = useState(new Date());
    const [horaFim, setHoraFim] = useState(new Date());

    function addHorario() {

        adicionarHorario(idLoja, diaInicio, diaFim, horaInicio, horaFim)
        .then(() => {setAtualizarData(!atualizarData)})
        .catch(error  => console.log(error))

    }
    return (
       
        <View >  
            <View style = {stylesInfoLoja.DiaPickerContainer}>
                <Text style = {stylesInfoLoja.IntervaloDiaTitle}>Selecione os Dias/Horarios</Text>
                <View style = {{paddingLeft: 20, alignSelf: 'flex-start', alignItems: 'flex-end'}}>
                    <DiaPicker valorSelecionado = {diaInicio} setValorSelecionado = {setDiaInicio} texto = 'De:'/>
                    <DiaPicker valorSelecionado = {diaFim} setValorSelecionado = {setDiaFim} texto = 'a:'/>
                </View> 
            </View>

            <View style = {stylesInfoLoja.TimeSelectorContainer}>
                <View style = {stylesInfoLoja.HorarioInicioFimContainer}>
                    <Text style = {stylesInfoLoja.HorarioTitle}>Das: </Text>
                    <TimePicker setTime = {setHoraInicio} texto = {horaInicio.getMinutes() < 10? horaInicio.getHours()+ ":" + '0' + horaInicio.getMinutes(): horaInicio.getHours()+ ":" + horaInicio.getMinutes()}/>
                </View>
                <View style = {stylesInfoLoja.HorarioInicioFimContainer}>
                    <Text style = {stylesInfoLoja.HorarioTitle}>Até as: </Text>
                    <TimePicker setTime = {setHoraFim} texto = {horaFim.getMinutes() < 10? horaFim.getHours()+ ":" + '0' + horaFim.getMinutes(): horaFim.getHours()+ ":" + horaFim.getMinutes()}/>
                </View>
            </View>

            <TouchableOpacity 
                /*
                Esse Touchable é um botão que quando clickado adiciona
                 ao estabelicimento o horario de atendimento selecionado
                */
                style = {stylesInfoLoja.CadastrarHorarioAtendimentoBotao}
                onPress ={() => {setModalAtiva(!modalAtiva); addHorario();}}
            >
                <Text style = {stylesInfoLoja.CadastrarHorarioAtendimentoText}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </View>
       
    );

};

//Renderiza um horario de atendimento  (dias e horario)
const RenderHorario = ({idLoja, item, setAtualizarData, atualizarData}) =>{


    const diasSemana = ['','Segunda','Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']

    const Remove = () => {

        function Delete() {
            
            deletaHorario(idLoja, item.id)
            .then(() => {setAtualizarData(!atualizarData)})
            .catch(error  => console.log(error))

        }

        return (
            <View style = {{flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f8f8ff'}}>
                    <TouchableOpacity 
                        style = {stylesInfoLoja.RemoverHorarioAtendimento}
                        onPress = {Delete}
                    >
                        <Icon type = 'font-awesome' name = 'trash' size = {45} color = "white"/>
                    </TouchableOpacity>
            </View>
        );
    }
    function retornaDias(inicio, fim){
        if (inicio == fim){
            return inicio;
        }
        return inicio + '-' + fim;
    }
    return (
        <Swipeable
            renderRightActions = {Remove}
        >
            <View style = {stylesInfoLoja.StyleHorarioAtendimentoContainer}> 
                <TouchableOpacity 
                    style = {stylesInfoLoja.StyleItemContainer} 
                >
                    <Text style = {stylesInfoLoja.StyleItemTextDia}>{retornaDias(diasSemana[item.dow_start], diasSemana[item.dow_end])}</Text>
                    <Text style = {stylesInfoLoja.StyleItemTextHora}>{item.opens_at.substring(0, 5)} - {item.closes_at.substring(0, 5)}</Text>
   
                </TouchableOpacity> 
            </View>
        </Swipeable>
    );
}

//Renderiza todos os horarios de atendimento de uma loja (dias e horario)
const HorariosDeAtendimento = ({idLoja, atualizarData, setAtualizarData}) => {

    const [DataHorarios, setDataHorarios] = useState("");
    const [listHorarios, setListHorarios] = useState(null);

    async function setaDados() {
        
        setaDadosHorario(idLoja)
        .then(resposta => resposta.json())
        .then(article => setDataHorarios(article))
        .catch(error => console.log(error))

    }
    useEffect(() => {

        setaDados();
       
    },[atualizarData])

    useEffect(() => {

        if (DataHorarios != ""){
            setListHorarios(DataHorarios["response"].map(item => (<RenderHorario key = {item.id} idLoja = {idLoja} item = {item} setAtualizarData = {setAtualizarData} atualizarData = {atualizarData}/>)));
        }

    },[DataHorarios])
     
    return (
        <SafeAreaView style = {{minHeight: 50}}>
            {listHorarios}
        </SafeAreaView>
    );
};


//Renderiza os Hararios de Atendimento junto de um header
const SectionHorarioAtendimento = ({id}) => {

    const [atualizarData, setAtualizarData] = useState(true);
    return (
        <SafeAreaView>
            <OptionsHeader 
                idLoja = {id}
                Filho = {NovoHorarioAtendimento} 
                title = 'Horarios de Atendimento' 
                buttonAdd = {true} 
                btnTitle = 'Adicionar Horario!' 
                atualizarData = {atualizarData}
                setAtualizarData = {setAtualizarData}
            />
            <HorariosDeAtendimento idLoja = {id} atualizarData = {atualizarData} setAtualizarData = {setAtualizarData}/>
        </SafeAreaView>
    );

}

export default SectionHorarioAtendimento;