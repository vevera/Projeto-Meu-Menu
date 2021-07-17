import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, SectionList, StyleSheet, TouchableOpacity } from 'react-native';


const DATA = [
    {
        title: "Massas",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Outros",
        data: ["Batatas Francesas", "Anel de Cebola", "Camarão"]
    },
    {
        title: "Bebidas",
        data: ["Agua", "Limonada", "Cerveja"]
    },
    {
        title: "Sobremesas",
        data: ["Bolo", "Sorvete"]
    }
];


const Item = ({nome, paiNome, estadoCategoria, estadoClick}) => {
    const[ativo, setAtivo] = useState(true);
    
    useEffect(() => {
        if (estadoCategoria === paiNome){
            setAtivo(!ativo);
        }

    },[estadoClick]);
    
    if(ativo) {
        return null;
    }
    else {
        return (
            <View style={styles.item}>
            <Text style={styles.title}>{nome}</Text>
            </View>
        );
    }

};

const Categoria = ({ nome , catNome, click, setCatNomeFun, setClickFun}) => {
    
    const[aberta,setAberta] = useState(true);
    const backgroundColor = aberta? '#ff5232': '#ff7b5a';
    return (
    <TouchableOpacity 
        style = {[styles.categoriaStyle,{backgroundColor}]}

        onPress = {() => {
            setCatNomeFun(nome); 
            setClickFun(!click);
            setAberta(!aberta);
        }}
        
    >
        <Text style={styles.header}>
            {nome}
        </Text>
    </TouchableOpacity>
    );
};


const Itens = () => {
    const[catNome,setCatNome] = useState("");
    const[click,setClick] = useState(true);
    const[data,setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.103:5000/get/categoriaItens', {method: 'GET'})
        .then(resposta => resposta.json())
        .then(article => {setData(article)})
    },[])
    return (

        <SafeAreaView style={styles.container}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, section }) => <Item nome={item[2]} paiNome = {section.title} estadoCategoria = {catNome} estadoClick = {click}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <Categoria nome={title} catNome = {catNome} click = {click} setCatNomeFun = {setCatNome} setClickFun = {setClick}/>
                )}
            />
        </SafeAreaView>
    );
}




export default Itens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 10,
        marginVertical: 8,
        borderRadius: 20,
    },
    categoriaStyle: {    
        marginBottom: 20,
        borderRadius: 11,
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: "#fff",
    },
    title: {
        fontSize: 24
    }
});