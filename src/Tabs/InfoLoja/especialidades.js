import React, { useEffect, useState } from 'react';
import { TextInput} from 'react-native';
import { TouchableOpacity} from 'react-native';
import { View, SafeAreaView, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';

import OptionsHeader from './optionsHeader';

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

const NovaEspecialideComponent = ({idLoja, setModalAtiva, modalAtiva, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const [especialidade, setEspecialidade] = useState("");

    function adicionarEspecialidade(novaEspecialidade) {

        var listaDeEspecialidades = especialidadesAtuais;
        if ((/[a-z0-9]/i.test(especialidade))){
            listaDeEspecialidades.push(novaEspecialidade);
        }
        
        console.log(listaDeEspecialidades);

        fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(idLoja)}/specialtys`, {
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

const RenderEspecialidade = ({idLoja, item, indice, atualizarData, setAtualizarData, especialidadesAtuais}) => {

    const Remove = () => {

        function Delete() {
            
            var listaDeEspecialidades = especialidadesAtuais;
            listaDeEspecialidades.splice(indice, 1);
        
            console.log(listaDeEspecialidades);

            fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(idLoja)}/specialtys`, {
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
const Especialidades = ({idLoja, atualizarData, setAtualizarData, setListaDeEspecialidades}) => {

    const [dadosEspecialidades, setDadosEspecialidades] = useState("");
    const [listEspecialidades, setListEspecialidades] = useState(null);
    
    function timeout(ms, promise) {
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error('TIMEOUT'))
          }, ms)
      
          promise
            .then(value => {
              clearTimeout(timer)
              resolve(value)
            })
            .catch(reason => {
              clearTimeout(timer)
              reject(reason)
            })
        })
    }

    async function setaDados() {

        timeout(5000, fetch(`http://192.168.1.103:5000/store/${encodeURIComponent(idLoja)}/specialtys`, {
            method: 'GET',
        }))
        .then(resposta => {console.log(resposta); return resposta.json()})
        .then(article => setDadosEspecialidades(article))
        .catch(error => console.log(error))
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