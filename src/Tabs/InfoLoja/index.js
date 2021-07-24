import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import { TextInput , Image} from 'react-native';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet ,ScrollView, Modal, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { set } from 'react-native-reanimated';
import { Switch } from 'react-native';

const EspecialidadesData = [

    {
        id: "1",
        especialidade: "Especialidade 1",
    },
    {
        id: "2",
        especialidade: "Especialidade 2",
    },
    {
        id: "3",
        especialidade: "Especialidade 3",
    },

];

const RemoveUpdateButtons = () => {

    return (
        <View style = {{flexDirection: 'row',}}>
                <TouchableOpacity style = {stylesInfoLoja.RemoverHorarioAtendimento}>
                    <Text style = {stylesInfoLoja.RemoverHorarioAtendimentoText}>
                        Remover
                    </Text>
                </TouchableOpacity>
            
                <TouchableOpacity style = {stylesInfoLoja.AtualizarHorarioAtendimento}>
                    <Text style = {stylesInfoLoja.AtualizarHorarioAtendimentoText}>
                        Atualizar
                    </Text>
                </TouchableOpacity>
        </View>

    );
}

const Item = ({item, itemTouchIconContainer, selectedId, setSelectedId,  itemStyle, textStyle,  touchItemStyle, setor, setSetor}) => {

    const buttonAble = selectedId == item.id ? true : false;
    const setorSelcionado = setor == 'Especialidades' ? true : false;
    const [able, setAble] = useState(true);

    return (
        <View style = {itemStyle}>
            <View style = {itemTouchIconContainer}>
                <TouchableOpacity 
                    style = {touchItemStyle} 
                    onPress = {() => {
                        if(selectedId != item.id){
                            setAble(true);
                        }
                        else{
                            setAble(!able);
                        }
                        setSetor('Especialidades');
                        setSelectedId(item.id);
                        
                    }}
                >
                    <Text style = {textStyle}>{item.especialidade}</Text>
                
                </TouchableOpacity>
                {(buttonAble && able && setorSelcionado) && (<RemoveUpdateButtons />)}
            </View>
        </View>
    );

}

const NovaEspecialideComponent = () => {

    return (

        <View style = {{borderRadius: 10, borderWidth: 1, width: '90%', marginBottom: 20, marginTop: 20,alignSelf: 'center'}}>
            <TextInput
                style = {{fontSize: 25}}
                placeholder = 'Especialidade...'
            />
        </View>

    );

};

const AdicionarItem = ({children, buttonTitle}) => {

    const [novaEspecialidade, setNovaEspecialidade] = useState(false);
    return (

    <View style = {{height: 50,paddingTop: 10}}>

        <Modal
            animationType = 'fade'
            transparent = {true}
            visible = {novaEspecialidade}     
        >
            <View style={stylesInfoLoja.ModalCentralizado}>
                <View style = {stylesInfoLoja.ModalView}>
                    {children}
                    <TouchableOpacity 
                        style = {stylesInfoLoja.CadastrarHorarioAtendimentoBotao}
                        onPress ={() => {setNovaEspecialidade(!novaEspecialidade)}}
                    >
                        <Text style = {stylesInfoLoja.CadastrarHorarioAtendimentoText}>
                            {buttonTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <TouchableOpacity 
            style = {stylesInfoLoja.AdicionarHorarioAtendimentoBotao}
            onPress ={() => {setNovaEspecialidade(!novaEspecialidade)}}
        >
            <Icon name = 'plus' type = 'antdesign' size = {29} color = '#228b22'/>
        </TouchableOpacity>
        
    </View>
    )

};
/**/
const Especialidades = ({setor, setSetor}) => {

    const[selectedId, setSelectedId] = useState('');

    const RenderItem = ({item}) => {

        return(
            <Item
                item = {item}
                itemStyle = {stylesInfoLoja.ItemStyle}
                textStyle = {stylesInfoLoja.IconTextStyle}
                touchItemStyle = {stylesInfoLoja.TouchItemStyle}
                itemTouchIconContainer = {stylesInfoLoja.ItemTouchIconContainer}
                selectedId = {selectedId}
                setSelectedId = {setSelectedId}
                setor = {setor}
                setSetor = {setSetor}
            />
        );

    };

    

    const itemsListArr = EspecialidadesData.map(item => (<RenderItem key = {item.id} item = {item}/>));

    return (

        <SafeAreaView style = {{backgroundColor: 'white'}}>
                {itemsListArr}  
        </SafeAreaView>

    );

};
// <AdicionarItem/>
const OptionsHeader = ({title, children, buttonAdd, btnTitle}) => {

    return (
        <View style = {stylesInfoLoja.HeaderEspecialidades}>
            <Text style = {stylesInfoLoja.HeaderEspecialidadesText}>
                {title} 
            </Text>
            {buttonAdd && 
            <AdicionarItem buttonTitle = {btnTitle}>
                {children}
            </AdicionarItem>}
        </View>

    );

};

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

const DiaPicker = ({valorSelecionado,setValorSelecionado}) => {

return (

    <View style = {stylesInfoLoja.StyleDataPickerContainer}>
        <Picker
            style = {stylesInfoLoja.DiaPickerStyle}
            selectedValue = {valorSelecionado}
            onValueChange = {(itemValue, itemIndex) => setValorSelecionado(itemValue)}
        >
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Segunda' value = 'Segunda'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Terça' value = 'Terça'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Quarta' value = 'Quarta'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Quinta' value = 'Quinta'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Sexta' value = 'Sexta'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Sabado' value = 'Sabado'/>
            <Picker.Item style = {stylesInfoLoja.PickerItemStyle} label = 'Domingo' value = 'Domingo'/>
        </Picker>
    </View>

);

};


const NovoHorarioAtendimento = () => {
    const [diaInicio, setDiaInicio] = useState("");
    const [diaFim, setDiaFim] = useState("");

    const [horaInicio, setHoraInicio] = useState(new Date());
    const [horaFim, setHoraFim] = useState(new Date());

    return (
       
        <View >  
            <View style = {stylesInfoLoja.DiaPickerContainer}>
                <Text style = {stylesInfoLoja.IntervaloDiaTitle}>Dias de Funcionamento</Text>
                <DiaPicker valorSelecionado = {diaInicio} setValorSelecionado = {setDiaInicio}/>
                <DiaPicker valorSelecionado = {diaFim} setValorSelecionado = {setDiaFim}/>

            </View>

            <View style = {stylesInfoLoja.TimeSelectorContainer}>
                <View style = {stylesInfoLoja.HorarioInicioFimContainer}>
                    <Text style = {stylesInfoLoja.HorarioTitle}>Horario de Inicio:</Text>
                    <TimePicker setTime = {setHoraInicio} texto = {horaInicio.getMinutes() < 10? horaInicio.getHours()+ ":" + '0' + horaInicio.getMinutes(): horaInicio.getHours()+ ":" + horaInicio.getMinutes()}/>
                </View>
                <View style = {stylesInfoLoja.HorarioInicioFimContainer}>
                    <Text style = {stylesInfoLoja.HorarioTitle}>Horario do Fim:</Text>
                    <TimePicker setTime = {setHoraFim} texto = {horaFim.getMinutes() < 10? horaFim.getHours()+ ":" + '0' + horaFim.getMinutes(): horaFim.getHours()+ ":" + horaFim.getMinutes()}/>
                </View> 
            </View>
        </View>
       
    );

};

const DataHorariosAtendimento = [

    {
        id: 1,
        dias: 'Segunda - Sexta',
        horario: '08:00 - 18:00',

    },
    {
        id: 2,
        dias: 'Quarta - Quinta',
        horario: '21:00 - 22:00',

    },
    {
        id: 3,
        dias: 'Domingo - Domingo',
        horario: '17:00 - 22:00',

    },
    {
        id: 4,
        dias: 'Segunda - Terça',
        horario: '17:00 - 22:00',

    },

]

const HorariosDeAtendimento = ({setor, setSetor}) => {

    const [selectedId, setSelectedId] = useState('');
   
    const RenderItem = ({item, setSelectedId, selectedId}) =>{

        const buttonAble = selectedId == item.id ? true : false;
        const setorSelcionado = setor == 'Horario de Atendimento' ? true : false;
        const [able, setAble] = useState(true);
        
        return (
            <View style = {stylesInfoLoja.StyleHorarioAtendimentoContainer}> 
                <TouchableOpacity 
                    style = {stylesInfoLoja.StyleItemContainer} 
                    onPress = {() => {
                        if(selectedId != item.id){
                            setAble(true);
                        }
                        else{
                            setAble(!able);
                        }
                        setSelectedId(item.id);
                        setSetor('Horario de Atendimento');   
                    }}>
                    <Text style = {stylesInfoLoja.StyleItemTextDia}>{item.dias}</Text>
                    <Text style = {stylesInfoLoja.StyleItemTextHora}>{item.horario}</Text>
       
                </TouchableOpacity>
                {(buttonAble && able && setorSelcionado) && (<RemoveUpdateButtons />)}
                
            </View>
        );
    
    }

    const listHorariosAtendimento = DataHorariosAtendimento.map(item => (<RenderItem key = {item.id} item = {item} setSelectedId = {setSelectedId} selectedId = {selectedId} setor = {setor} setSetor = {setSetor}/>));

    return (

        <SafeAreaView >
            {listHorariosAtendimento}  
        </SafeAreaView>
    );
};


const RenderMetodoDePagamento = ({texto,isPix,iconName, color}) => {
    const [switchOn, setSwitchOn] = useState(false);
        
    return (
        <View style = {{alignItens: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 70}}>
            <View style = {stylesInfoLoja.MetodosDePagementoContainer}>
                
                {isPix &&
                    <View style = {{marginLeft: 10,width: 50, alignItems: 'center'}}>
                        <Image
                            style={{width: 30, height: 30}}
                            source={require('../../../assets/pix.png')}
                        />
                    </View> 
                }
                {!isPix && 
                    <Icon
                        style = {{marginLeft: 10, width: 50}}
                        name = {iconName}
                        type = 'font-awesome'
                        size = {30}
                        color = {color}
                    />
                }
                <Text style = {stylesInfoLoja.TextoMetodoDePagamento}>{texto}</Text>
            </View>
            <Switch
                style = {{marginRight: 10}} 
                rackColor = {{false: 'red', true: 'green'}}
                thumbColor = {switchOn? 'green' : '#ff4040'}
                onValueChange = {() => {setSwitchOn((prevVal) => !prevVal)}}
                value = {switchOn}
            />
        </View>
    );
}

const MetodosDePagemento = () => {


    return (

        <SafeAreaView>
            <RenderMetodoDePagamento texto = 'Cartão de Credito' isPix = {false} iconName = 'credit-card-alt' color = 'blue'/>
            <RenderMetodoDePagamento texto = 'Cartão de Debito' isPix = {false} iconName = 'credit-card-alt' color = 'red'/>
            <RenderMetodoDePagamento texto = 'Dinheiro' isPix = {false} iconName = 'money' color = 'green'/>
            <RenderMetodoDePagamento texto = 'Pix' isPix = {true} iconName = 'plus' color = 'green'/>

        </SafeAreaView>

    );
};

const InfoLoja = () =>{

    const [setorSelecionadoAtual, setSetorSelecionadoAtual] = useState('');

    return(

        <SafeAreaView style={stylesInfoLoja.container}>
            <ScrollView style = {stylesInfoLoja.scrollOptions}>
                
                < OptionsHeader title = 'Especialidades' buttonAdd = {true} btnTitle = 'Adicionar Especialidade!'>
                    <NovaEspecialideComponent/>
                </OptionsHeader>
                
                <Especialidades setor = {setorSelecionadoAtual} setSetor = {setSetorSelecionadoAtual}/>

                < OptionsHeader title = 'Horarios de Atendimento' buttonAdd = {true} btnTitle = 'Adicionar Horario!'>
                    <NovoHorarioAtendimento/>
                </OptionsHeader>

                <HorariosDeAtendimento setor = {setorSelecionadoAtual} setSetor = {setSetorSelecionadoAtual}/>
            
                < OptionsHeader title = 'Metodos de Pagamento' buttonAdd = {false}/>

                <MetodosDePagemento />

            </ScrollView>
                    
        </SafeAreaView>
    );
}

stylesInfoLoja = StyleSheet.create({

    MetodosDePagementoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextoMetodoDePagamento:{
        fontSize: 17,
        
        marginLeft: 20,

    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: "center",
        backgroundColor: 'white',

    },
    texto: {
    },
    scrollOptions: {
        
        height: '100%',
        width: '100%',
        
    },
    optionsStyle: {
        width: "100%",
       
    },
    TouchOptionsStyle: {
        width: "100%",
        height: "100%",
        height: 40,
        borderRadius: 10,
        backgroundColor: "gray",
    },
    TextOptionsStyle: {
        paddingLeft: 20,
        fontSize: 25,
    },

    ItemStyle: {
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: '#f8f8ff',
        borderRadius: 8,
        width: '95%',
        height: 80,
        alignSelf: 'center',
    },
    ItemTouchIconContainer: {
        width: '100%',
        //backgroundColor: 'pink',
        height: '100%',
       
        
    },
    TouchItemStyle: {
        flex: 1,
        paddingBottom: 15,
        paddingTop: 10,
       
    },
    IconTextStyle: {
        fontSize: 17,
        paddingLeft: 5,
        fontWeight: 'bold', 
        color: '#1d1d1d',

    },
    AdicionarItemContainer: {

        width: '100%',
        height: 50,

    },
    AdicionarItemStyle: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    HeaderEspecialidades: {
        
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 10,
        paddingLeft: 10,
        
        //paddingTop: 70,
        //top: 60,
        height: 60,
        width: '100%',
        backgroundColor: '#10d177',
        justifyContent: 'space-between',
        alignItems: 'center',
       
        
    },
    HeaderEspecialidadesText: {
        fontSize: 25,
        color: 'white', 
        fontWeight: 'bold',
        
    },
    TimePickerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,

    },
    TimePickerTextStyle: {
        paddingRight: 8,
        fontSize: 20,
        fontWeight: 'bold',

    },
    TimeSelectorContainer: {
        paddingTop: 25,
        width: '100%',
        alignItems: 'center',
        //flexDirection: 'row',

    },
    HorarioInicioFimContainer: {
       
        width: '100%', 
    
        justifyContent: 'center',
        alignItems: 'center',
        //alignSelf: 'center',
        flexDirection: 'row',
    },
    HorarioTitle: {
        paddingRight: 20,
        fontSize: 18,
        fontWeight: 'bold',
        width: 180,

    },
    IntervaloDiaTitle: {
      alignSelf: 'center', 
      fontWeight: 'bold', 
      fontSize: 18,
    },
    DiaPickerStyle: {
        
    },
    PickerItemStyle: {

        fontWeight: '100',
        fontSize: 18,

    },
    StyleDataPickerContainer: {
        paddingTop: 20,

    },
    DiaPickerContainer: {
        paddingTop: 10,

    },
    CadastrarHorarioAtendimentoBotao:{
        backgroundColor: '#005eff',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CadastrarHorarioAtendimentoText:{
       
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',

    },
    AdicionarHorarioAtendimentoBotao:{
        //backgroundColor: '#483D8B',
        borderRadius: 50,
        //backgroundColor: 'blue',
        //borderWidth: 2,
        //borderColor: 'black',
        //height: '100%',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'center',
        //marginBottom: 3,
        marginRight: 10,
    },
    AdicionarHorarioAtendimentoText:{
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',

    },
    ModalCentralizado: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.6)',

        
    },
    ModalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
    
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    StyleHorarioAtendimentoContainer: {
        //backgroundColor: 'purple',
        //flexDirection: 'row',
        alignItems: 'flex-start',
        //justifyContent: 'flex-start',
        marginTop: 2,
        marginBottom: 4,
        
        //borderBottomColor: 'black',
        //borderWidth: 1,
        //borderBottomWidth: 1,
        //borderWidth: 1,
        //borderColor: 'gray',
        backgroundColor: '#f8f8ff',
        borderRadius: 8,
        height: 80,
        width: '95%',
        alignSelf: 'center',
    },
    RemoverHorarioAtendimento: {
        marginLeft: 10,
        backgroundColor: 'red',
        borderRadius: 15,
        width: '30%',
        alignItems: 'center',
        //alignSelf: 'center',
    },
    RemoverHorarioAtendimentoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    },
    AtualizarHorarioAtendimento: {
        marginLeft: 10,
        backgroundColor: '#191970',
        borderRadius: 15,
        width: '30%',
        alignItems: 'center',
        //alignSelf: 'center',
    },
    AtualizarHorarioAtendimentoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    },
    StyleItemContainer: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //height: '40%',
        //backgroundColor: 'white',
        paddingBottom: 20,
        flex: 6,
        

    },
    
    StyleItemTextDia: {
        flex: 2,
        fontSize: 17,
        paddingLeft: '3%',
        //width: '50%',
        fontWeight: 'bold',
        color: '#1d1d1d',
        //backgroundColor: 'blue',


    },
    StyleItemTextHora: {
        flex: 2,
        //width: '45%',
        //backgroundColor: 'red',
        //paddingLeft: '12%',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1d1d1d',
        //textAlign: 'right',

    },


});
export default InfoLoja;

