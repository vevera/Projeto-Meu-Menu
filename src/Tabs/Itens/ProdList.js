import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';

import * as data from '../../connection.json';

function temImagem(imagem) {
  console.log("Linha 144 Prodlist:", imagem);
  return imagem ? (
    
    <Image
      style={styles.imagem}
      source={{
        //uri: imagem,
        uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
      }}
    />
  ) : (
    <Image
      style={styles.imagem}
      source={{
        uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
      }}
    />
  );
}

function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}

const Item = ({title, image, info, price}) => (
  <View style={styles.item}>
    {temImagem(image)}
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitulo}>{info}</Text>
      <Text style={styles.subtitulo}>à partir de R$:{price}</Text>
    </View>
  </View>
);

function Footer({section, idLoja, navigation}) {
  return (
    <View style={{height: 50, width: '100%'}}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('CadastroProd', {"idCat": section.section.id, "idLoja": idLoja})}>
        <Icon name="add" size={35} color="#18bc9c" />
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          Adicionar Produto
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function FooterCat({idLoja, navigation}) {
  return (
    <View style={{height: 50, width: '100%'}}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('CadastroCat', {'idLoja': idLoja})}>
        <Icon name="add" size={35} color="#18bc9c" />
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          Adicionar Categoria
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const ListaDeProdutosPorCategoria = ({DATA, idLoja, navigation}) => {

  const forceUpdate = useForceUpdate();

  return (

    <View style={{backgroundColor: 'white'}}>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditarProd', item)}>
                <View>
                  <Item
                    title={item.name}
                    image={item.photo}
                    info={item.description}
                    price={item.price}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({section: {name, description, id}}) => (
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: '#2c3e50',
                height: 60,
                borderRadius: 10,
                width: '98%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditarCat', {name, description, id, idLoja})}
                style = {{justifyContent: 'center'}}
              >
                <Text style={styles.header}>{name}</Text>
              </TouchableOpacity>
            </View>
          )}
          renderSectionFooter={(section) => <Footer section = {section} idLoja = {idLoja} navigation = {navigation}/>}
          ListFooterComponent={(section) => <FooterCat idLoja = {idLoja} navigation = {navigation}/>}
        />
      </SafeAreaView>
    </View>

  );

}


export default function Lista({route,  navigation}) {

  const [DATA, setDATA] = useState([]);
  const idLoja = route.params.idLoja;

  const [updateData, setUpdateData] = useState(route.params.mudar);
  
  console.log(updateData);
  async function getProdutoCategoria() {
    
    fetch(`http://192.168.1.103:5000/store/21/categories`,
      {
        method: 'GET',
        headers: new Headers({
          'Accept': '*/*',
          'Content-Type': '*/*',
        }),
        
      }
    )
      .then(response => response.json())
      .then(response => setDATA(response.response))
      .catch(error => console.log(error));

    }
    
  useEffect(()=>{
    getProdutoCategoria();
    setUpdateData(true);
    () => {useForceUpdate};
  },[updateData]) 
  
  console.log(DATA);
  
  return (
    <ListaDeProdutosPorCategoria DATA = {DATA} idLoja = {idLoja} navigation = {navigation}/>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: '1%',
    flex: 0,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    marginTop: 2,
    backgroundColor: '#f8f8ff',
    borderRadius: 8,
    width: '95%',
    height: 80,
    alignSelf: 'center',
  },
  subtitulo: {
    fontWeight: 'bold',
    color: 'grey',
  },
  header: {
    marginHorizontal: '2%',
    marginBottom: '2%',
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imagem: {
    marginHorizontal: '2%',
    alignSelf: 'flex-end',
    width: 80,
    height: '90%',
    borderRadius: 10,
  },
});
