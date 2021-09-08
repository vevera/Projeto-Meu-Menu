import React, { useEffect, useState } from 'react';
import { TextInput} from 'react-native';
import { TouchableOpacity} from 'react-native';
import { View, SafeAreaView, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';

import OptionsHeader from './optionsHeader';

import * as data from '../../connection.json';

import {adicionarEspecialidade, deleteEspecialidade, getDadosEspecialidades} from '../../conn/especialidades.js';

let row = [];


//Componente que renderiza uma Especialidade
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

//Renderiza a área onde uma especialidade poderá ser digitada e adicionada a uma loja
const NovaEspecialideComponent = ({idLoja, setModalAtiva, modalAtiva, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const [especialidade, setEspecialidade] = useState("");

    //Função que adiciona uma Especilidade
    function addEspecilidade() {

        adicionarEspecialidade(especialidade, especialidadesAtuais, idLoja)
        .then(() => {setAtualizarData(!atualizarData)});
        
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
                onPress ={() => {
                    setModalAtiva(!modalAtiva); 
                    addEspecilidade();
                }}
            >
                <Text style = {stylesInfoLoja.CadastrarHorarioAtendimentoText}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </View>
    );

};


//RenderEspecialidade renderiza uma Especialidade junto com a lixeira de deleta-la
const RenderEspecialidade = ({idLoja, item, indice, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const Remove = () => {

        //Função que faz o Delete de uma especialidade
        function Delete() {
            
            deleteEspecialidade(especialidadesAtuais, indice, idLoja)
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

//Componente que Renderiza TODAS as especialidades de uma loja
const Especialidades = ({idLoja, atualizarData, setAtualizarData, setListaDeEspecialidades}) => {

    const [dadosEspecialidades, setDadosEspecialidades] = useState("");
    const [listEspecialidades, setListEspecialidades] = useState(null);
    
    //recuperamos as Especialidades de uma determidada loja
    async function getEspecialidades() {

        getDadosEspecialidades(idLoja)
        .then(article => setDadosEspecialidades(JSON.parse(article)))
        .catch(error => console.log(error))
    }

    useEffect(()=> {

        getEspecialidades();
    
    },[atualizarData])

    useEffect(() => {

        if (dadosEspecialidades != ""){
            setListaDeEspecialidades(dadosEspecialidades["specialtys"]);
            setListEspecialidades(  
                dadosEspecialidades["specialtys"].map((item, index) => (
                    <RenderEspecialidade 
                        idLoja = {idLoja}
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


//Seção que renderiza as Especialidades Junto com um header
const SectionEspecialidade = ({id}) => {

    const [atualizarData, setAtualizarData] = useState(true);
    const [especialidesList, setEspecialidadeList] = useState([]);

    return (
        <SafeAreaView>
            < OptionsHeader
                idLoja = {id} 
                Filho = {NovaEspecialideComponent} 
                title = 'Especialidades' 
                buttonAdd = {true} 
                btnTitle = 'Adicionar Especialidade!'
                atualizarData = {atualizarData}
                setAtualizarData = {setAtualizarData}
                especialidesList = {especialidesList}
            />

            <Especialidades 
                idLoja = {id}
                atualizarData = {atualizarData} 
                setAtualizarData = {setAtualizarData} 
                setListaDeEspecialidades = {setEspecialidadeList}
            />
        </SafeAreaView>
    );
};

export default SectionEspecialidade;