import React, {useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView, StyleSheet ,ScrollView} from 'react-native';

import SectionEspecialidade from './especialidades';
import SectionHorarioAtendimento from './horarioAtendimento';
import MetodosDePagementoSection from './metodosPagamento';

//Renderiza todos as opçoes (Especialidades, Horarios De Atendimento e Metodos de Pagamento)
const InfoLoja = ({route}) =>{

    const idLoja = route.params;
    console.log(idLoja);

    return(

        <SafeAreaView style={stylesInfoLoja.container}>
            <ScrollView style = {stylesInfoLoja.scrollOptions}>

                <SectionEspecialidade id = {idLoja.idLoja}/>
                <SectionHorarioAtendimento id = {idLoja.idLoja}/>
                <MetodosDePagementoSection />

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
        alignItems: "center",
        backgroundColor: 'white',
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
        height: 60,
        width: '100%',
        backgroundColor: '#2c3e50',
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
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'flex-start',
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: '#f8f8ff',
        borderRadius: 8,
        height: 80,
        width: '95%',
        alignSelf: 'center',
    },
    RemoverHorarioAtendimento: {
        backgroundColor: 'red',
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 10,
    },
    RemoverHorarioAtendimentoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    AtualizarHorarioAtendimento: {
        marginBottom: 10,
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
        paddingBottom: 20,
        flex: 6,
    },
    
    StyleItemTextDia: {
        flex: 2,
        fontSize: 17,
        paddingLeft: '3%',
        fontWeight: 'bold',
        color: '#1d1d1d',
    },
    StyleItemTextHora: {
        flex: 2,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1d1d1d',
    },


});
export default InfoLoja;

