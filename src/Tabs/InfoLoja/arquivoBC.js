import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';

import { TextInput , Image} from 'react-native';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';
import { View, SafeAreaView, Text, StyleSheet ,ScrollView, Modal, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { set } from 'react-native-reanimated';
import { Switch } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const Item = ({item, itemTouchIconContainer, itemStyle, textStyle,  touchItemStyle, indice}) => {

    return (
        <View style = {itemStyle}>
            <View style = {itemTouchIconContainer}>
                <TouchableOpacity 
                    style = {touchItemStyle}
                    onPress = {() => {console.log(indice)}} 
                >
                    <Text style = {textStyle}>{item}</Text>
                
                </TouchableOpacity>
            </View>
        </View>
    );

}

const NovaEspecialideComponent = ({setModalAtiva, modalAtiva, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const [especialidade, setEspecialidade] = useState("");

    function adicionarEspecialidade(novaEspecialidade) {

        var listaDeEspecialidades = especialidadesAtuais;
        if ((/[a-z0-9]/i.test(especialidade))){
            listaDeEspecialidades.push(novaEspecialidade);
        }
        
        console.log(listaDeEspecialidades);

        fetch(`http://192.168.1.103:5000/store/1/specialtys`, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                specialtys: listaDeEspecialidades,
           })
        })
        .then(resposta => resposta.text())
        .then(article => {console.log(article)})
        .then(() => {setAtualizarData(!atualizarData)})

    }

    return (

        <View>

            <Text style = {{paddingTop: 8, paddingLeft: 20, fontSize: 20, color: '#191970', fontWeight: 'bold'}}>
                Especialidade: 
            </Text>
            <View style = {{borderBottomWidth: 0.5 ,width: '80%', marginBottom: 15, marginTop: 20,alignSelf: 'center'}}>
            
                <TextInput
                    style = {{fontSize: 17}}
                    placeholder = 'Digite aqui...'
                    onChangeText = {(text) => {setEspecialidade(text)}}
                />
            </View>

            <TouchableOpacity 
                style = {stylesInfoLoja.CadastrarHorarioAtendimentoBotao}
                onPress ={() => {setModalAtiva(!modalAtiva); adicionarEspecialidade(especialidade)}}
            >
                <Text style = {stylesInfoLoja.CadastrarHorarioAtendimentoText}>
                    Adicionar
                </Text>
            </TouchableOpacity>

        </View>



    );

};

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

let row = [];
let prevOpenedRow;

const RenderEspecialidade = ({item, indice, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const Remove = () => {

        function Delete() {
            
            var listaDeEspecialidades = especialidadesAtuais;
            listaDeEspecialidades.splice(indice, 1);
        
            console.log(listaDeEspecialidades);

            fetch(`http://192.168.1.103:5000/store/1/specialtys`, {
                method: 'PUT',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    specialtys: listaDeEspecialidades,
            })
            })
            .then(resposta => resposta.text())
            .then(article => {console.log(article)})
            .then(() => {row[indice].close()})
            .then(() => {setAtualizarData(!atualizarData)})
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

    return(
        <Swipeable
            ref = {ref => {row[indice] = ref}}
            renderRightActions = {Remove}
        >
            <Item
                item = {item}
                itemStyle = {stylesInfoLoja.ItemStyle}
                textStyle = {stylesInfoLoja.IconTextStyle}
                touchItemStyle = {stylesInfoLoja.TouchItemStyle}
                itemTouchIconContainer = {stylesInfoLoja.ItemTouchIconContainer}
                indice = {indice}
            />
        </Swipeable>
    );

};
const Especialidades = ({atualizarData, setAtualizarData, setListaDeEspecialidades}) => {

    const [dadosEspecialidades, setDadosEspecialidades] = useState("");
    const [listEspecialidades, setListEspecialidades] = useState(null);
    
    async function setaDados() {

        let loop = true;
        while(loop){
            try{
                const resposta = await fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(1)}/specialtys`, {
                        method: 'GET',
                        timeout: 3000,
                });
                const article = await resposta.json();
                setDadosEspecialidades(article);
                loop = false;
                console.log('loop especialidades false');
            }
            catch (error){
                console.log('especialidades error');
                //console.log(error)
            }
        }
    }
    useEffect(()=> {

        setaDados();
        

    },[atualizarData])

    useEffect(() => {

        if (dadosEspecialidades != ""){
            setListaDeEspecialidades(dadosEspecialidades["specialtys"]);
            setListEspecialidades(  
                dadosEspecialidades["specialtys"].map((item, index) => (
                    <RenderEspecialidade 
                        key = {index} 
                        item = {item} 
                        indice = {index}
                        atualizarData = {atualizarData}
                        setAtualizarData = {setAtualizarData}
                        especialidadesAtuais = {dadosEspecialidades["specialtys"]}
                    />
                ))
            );
        }

    },[dadosEspecialidades])

    return (

        <SafeAreaView style = {{backgroundColor: 'white', minHeight: 50,}}>
            {listEspecialidades}
        </SafeAreaView>

    );

};
//{itemsListArr}  
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


const NovoHorarioAtendimento = ({setModalAtiva, modalAtiva, setAtualizarData, atualizarData}) => {
    const [diaInicio, setDiaInicio] = useState(1);
    const [diaFim, setDiaFim] = useState(2);

    const [horaInicio, setHoraInicio] = useState(new Date());
    const [horaFim, setHoraFim] = useState(new Date());

    function adicionarHorario() {

        fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(1)}/schedules`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                dow_start: diaInicio,
                dow_end: diaFim,
                opens_at: horaInicio.getHours() + ":" + horaInicio.getMinutes(),
                closes_at: horaFim.getHours() +":"+ horaFim.getMinutes(),
           })
        })
        .then(resposta => resposta.text())
        .then(article => {console.log(article)})
        .then(() => {setAtualizarData(!atualizarData)})

    }
    //"dow_start="+{diaInicio}+"&dow_end="+{diaFim}+"&opens_at="+{horaInicio}+"&closes_at="+{horaFim} // <-- Post parameters
    
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
                style = {stylesInfoLoja.CadastrarHorarioAtendimentoBotao}
                onPress ={() => {setModalAtiva(!modalAtiva); adicionarHorario();}}
            >
                <Text style = {stylesInfoLoja.CadastrarHorarioAtendimentoText}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </View>
       
    );

};

const RenderHorario = ({item, setAtualizarData, atualizarData}) =>{


    const diasSemana = ['','Segunda','Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']

    const Remove = () => {

        function Delete() {
            
            fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(1)}/schedules/delete`, {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    schedule_id: item.id,
               })
            })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
            .then(() => {setAtualizarData(!atualizarData)})

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
    return (
        <Swipeable
            renderRightActions = {Remove}
        >
            <View style = {stylesInfoLoja.StyleHorarioAtendimentoContainer}> 
                <TouchableOpacity 
                    style = {stylesInfoLoja.StyleItemContainer} 
                >
                    <Text style = {stylesInfoLoja.StyleItemTextDia}>{diasSemana[item.dow_start]} - {diasSemana[item.dow_end]}</Text>
                    <Text style = {stylesInfoLoja.StyleItemTextHora}>{item.opens_at.substring(0, 5)} - {item.closes_at.substring(0, 5)}</Text>
   
                </TouchableOpacity> 
            </View>
        </Swipeable>
    );
//{(buttonAble && able) && (<RemoveUpdateButtons />)}
}
const HorariosDeAtendimento = ({atualizarData, setAtualizarData}) => {

    const [DataHorarios, setDataHorarios] = useState("");
    const [listHorarios, setListHorarios] = useState(null);

    async function setaDados() {

        let loop = true;
        while(loop){
            try {
                const response = await fetch(`http://192.168.1.103:5000/store/1/schedules`, {
                    method: 'GET',
                    timeout: 3000,
                });
                //console.log(response);
                const article = await response.json();
                setDataHorarios(article);
                loop = false;
                console.log("loop horarios agora é falso");
                //console.log(response);

            } catch (error) {
                console.log("horarios erro");
                //console.log(error);
            }
        }
          
    }
    
    useEffect(() => {

        setaDados();
       
    },[atualizarData])

    useEffect(() => {

        if (DataHorarios != ""){
            setListHorarios(DataHorarios["response"].map(item => (<RenderHorario key = {item.id} item = {item} setAtualizarData = {setAtualizarData} atualizarData = {atualizarData}/>)));
        }

    },[DataHorarios])
     
    return (

        <SafeAreaView style = {{minHeight: 50}}>
            {listHorarios}
        </SafeAreaView>
    );
};
//{listHorariosAtendimento} 


const RenderMetodoDePagamento = ({texto,isPix,iconName, color}) => {
    const [switchOn, setSwitchOn] = useState(false);
        
    return (
        <View style = {{alignItens: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', height: 70, paddingBottom: 15}}>
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
                thumbColor = {switchOn? 'green' : 'gray'}
                onValueChange = {() => {setSwitchOn((prevVal) => !prevVal)}}
                value = {switchOn}
            />
        </View>
    );
}


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

const MetodosDePagemento = () => {


    return (

        <SafeAreaView>
            <RenderMetodoDePagamento texto = 'Cartão de Credito' isPix = {false} iconName = 'credit-card-alt' color = 'blue'/>
            <RenderMetodoDePagamento texto = 'Cartão de Debito' isPix = {false} iconName = 'credit-card-alt' color = 'red'/>
            <RenderMetodoDePagamento texto = 'Dinheiro' isPix = {false} iconName = 'money' color = 'green'/>
            <RenderMetodoDePagamentoPix texto = 'Pix'/>


        </SafeAreaView>

    );
};

const HorarioAtendimentoSection = () => {

    const [atualizarData, setAtualizarData] = useState(true);
    
    return (
        <SafeAreaView>
            < OptionsHeader 
                Filho = {NovoHorarioAtendimento} 
                title = 'Horarios de Atendimento' 
                buttonAdd = {true} 
                btnTitle = 'Adicionar Horario!' 
                atualizarData = {atualizarData}
                setAtualizarData = {setAtualizarData}
            />
            <HorariosDeAtendimento atualizarData = {atualizarData} setAtualizarData = {setAtualizarData}/>
        </SafeAreaView>
    );

}

const EspecialidadesSection = () => {

    const [atualizarData, setAtualizarData] = useState(true);
    const [especialidesList, setEspecialidadeList] = useState([]);

    return (
        <SafeAreaView>

            < OptionsHeader 
                Filho = {NovaEspecialideComponent} 
                title = 'Especialidades' 
                buttonAdd = {true} 
                btnTitle = 'Adicionar Especialidade!'
                atualizarData = {atualizarData}
                setAtualizarData = {setAtualizarData}
                especialidesList = {especialidesList}
            />

            <Especialidades 
                atualizarData = {atualizarData} 
                setAtualizarData = {setAtualizarData} 
                setListaDeEspecialidades = {setEspecialidadeList}
            />

        </SafeAreaView>
    );


}
            
const InfoLoja = () =>{

    const [setorSelecionadoAtual, setSetorSelecionadoAtual] = useState('');

    return(

        <SafeAreaView style={stylesInfoLoja.container}>
            <ScrollView style = {stylesInfoLoja.scrollOptions}>
                
                
                <EspecialidadesSection />
                
                <HorarioAtendimentoSection />

                < OptionsHeader title = 'Metodos de Pagamento' buttonAdd = {false}/>

                <MetodosDePagemento />

            </ScrollView>
                    
        </SafeAreaView>
    );
}

stylesInfoLoja = StyleSheet.create({

    ChavePixView: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: "center", 
        width: '70%', 
        alignSelf: 'flex-end', 
        marginRight: 20,
    },


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
        

    },
    TimeSelectorContainer: {
        paddingTop: 5,
        
        
        
    },
    HorarioInicioFimContainer: {
       
        //justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    HorarioTitle: {
        color: '#3d2b1f',
        paddingRight: 20,
        fontSize: 17,
        fontWeight: 'bold',
        width: 80,

    },
    IntervaloDiaTitle: {
      alignSelf: 'center', 
      fontWeight: 'bold', 
      fontSize: 18,
      color: '#191970'
    },
    DiaPickerStyle: {
        //alignSelf: 'center',
        width: '60%',
        color: '#000000'
       
    },
    PickerItemStyle: {

        fontWeight: '100',
        fontSize: 18,

    },
    StyleDataPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        
        
        height: '90%',
        marginRight: 10,
        backgroundColor: 'red',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'center',
    },
    RemoverHorarioAtendimentoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    },
    AtualizarHorarioAtendimento: {
        marginBottom: 10,
        //height: '45%',
        marginRight: 10,
        backgroundColor: '#191970',
        borderRadius: 7,
        width: 100,
        alignItems: 'center',
        
        
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

