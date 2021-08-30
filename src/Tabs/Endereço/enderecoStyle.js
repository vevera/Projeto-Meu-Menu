
import {StyleSheet} from 'react-native';

const styleEndereco = StyleSheet.create({
    Title: {
        fontSize: 30,
        paddingBottom: 30,
        paddingTop: 20,
        fontWeight: 'bold',
    
    },
    EnderecoContainer: {
        flex: 4,
        width: "100%",
        height: "100%",
        flexDirection: 'column',
    },
    InputView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    HeaderText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    EntrySection: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row', 
        borderBottomColor: "black",
        borderBottomWidth: 1.3,
        height: 40,
    },
    InputText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '100',
        color: "black",
    
    },
    IconStyle: {
        
       // paddingRight: 10,
        //paddingBottom: 20,
    },

    BotaoEditar: {
        
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center', 
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
      
    },
    BotaoEditarTouchable: {
        width: "100%",
        backgroundColor: "#18bc9c",
        height: 40,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: "black",
        

    },
    BotaoEditarText: {
        color: "black",
        fontSize: 23,
        fontWeight: 'bold',

    },

    BotaoSalvar: {
        paddingTop: 20,
        paddingLeft: 10,
        width: "50%",
       
        
        
    },
    BotaoSalvarTouchable: {

        backgroundColor: "green",
        height: 40,
        width: "100%",
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: "black",

    },
    BotaoSalvarText: {
        color: "black",
        fontSize: 23,
        fontWeight: 'bold',

    },

});

export {styleEndereco};