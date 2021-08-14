import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native'
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

import axios from 'axios';

import * as data from '../../connection.json';
import { withTheme } from 'react-native-elements';

function temImagem(imagem) {
  return imagem != '' ? (
    
    <Image
      style={styles.imagem}
      source={{
        uri: `data:image/jpg;base64,${imagem}`,
        //uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
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
      <Text style={styles.subtitulo}>à partir de R$:{price.toFixed(2)}</Text>
    </View>
  </View>
);

function Footer({section, idLoja, navigation}) {
  return (
    <View style={{marginHorizontal: '4%', marginTop: '2%', marginBottom: '2%'}}>
      <View style={{height: 40, width: '100%'}}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8ff',
          }}
          onPress={() => navigation.navigate('CadastroProd', {"idCat": section.section.id, "idLoja": idLoja})}>
          <Icon name="add" size={35} color="#18bc9c" />
          <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
            Adicionar Produto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FooterCat({idLoja, navigation}) {
  return (
    <View style={{marginHorizontal: '4%', marginTop: '2%', marginBottom: '2%'}}>
      <View style={{height: 40}}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8ff',
          }}
          onPress={() => navigation.navigate('CadastroCat', {'idLoja': idLoja})}>
          <Icon name="add" size={35} color="#18bc9c" />
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Adicionar Categoria
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ListaDeProdutosPorCategoria = ({route, idLoja, navigation}) => {

  const [DATA, setDATA] = useState([]);

  async function getProdutoCategoria() {

    try{
      const article = await axios.get(`${data.endereco}store/${idLoja}/categories`, {
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const resposta = await article.data
      return resposta.response;
    }
    catch(error){
      return [];
    }
    
  }
    
  const isFocused = useIsFocused();

  useEffect(async () => {
    let limit = 0;
    let tam = DATA.length;
    let dados1;
    do{
      dados1 = await getProdutoCategoria();
      tam = dados1.length;
      limit += 1;
      console.log(limit);
    }while(limit < 20 && tam == 0);
    setDATA(dados1);
        
  }, [isFocused])
   
  console.log(DATA);

  return (
    
    <View style={{minHeight: '100%',backgroundColor: 'white'}}>
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

  const idLoja = route.params.idLoja;
 
  return (
    <View>
      <ListaDeProdutosPorCategoria route = {route} idLoja = {idLoja} navigation = {navigation}/>
    </View>
    
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
