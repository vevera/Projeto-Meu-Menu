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

let row = [];

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

const SectionEspecialidade = () => {

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

};

export default SectionEspecialidade;