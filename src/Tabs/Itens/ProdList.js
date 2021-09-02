import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native'
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';

import {styleListaProduto} from './StyleItem.js'; // E importado o estilo do arquivo StyleItem.js

import {getProdutoCategoria} from '../../conn/categoria.js'; // Aqui importamos as funcoes necessarias para fazermos a comunicacao com o banco 

// a função temImagem vai possibilitar ao usuario selecionar uma imagem da galeria e atualizar a imagem do produto
function temImagem(imagem) {
  return imagem != '' ? (
    
    <Image
      style={styleListaProduto.imagem}
      source={{
        uri: `data:image/jpg;base64,${imagem}`,
      }}
    />
  ) : (
    <Image
      style={styleListaProduto.imagem}
      source={{
        uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
      }}
    />
  );
}

// Abaixo será renderizado o Item e aparecerá na inerface com as informações do produto
const Item = ({title, image, info, price, promotional_price}) => 
{
  const promo = promotional_price != null? true : false;

  function retornaPreco(){

    return promo? promotional_price.toFixed(2): price.toFixed(2);
    
  }

  return(
    <View style={styleListaProduto.item}>
      {temImagem(image)}
      <View>
        <Text style={styleListaProduto.title}>{title}</Text>
        <Text style={styleListaProduto.subtitulo}>{info}</Text>
        <Text style={styleListaProduto.subtitulo}>à partir de R$:{retornaPreco()}</Text>
      </View>
    </View>
)};

// Na funcao footer temos um touchable (clicavel) em que ao clicar somos redirecionados a tela de cadastro de produto
function Footer({section, idLoja, navigation}) {
  return (
    <View style={{marginHorizontal: '4%', marginTop: '2%', marginBottom: '2%'}}>
      <View style={{height: 40, width: '100%'}}>
        <TouchableOpacity
          style={styleListaProduto.viewFooter}
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

// Na funcao footerCat temos um touchable (clicavel) em que ao clicar somos redirecionados a tela de cadastro de Categoria
function FooterCat({idLoja, navigation}) {
  return (
    <View style={{marginHorizontal: '4%', marginTop: '2%', marginBottom: '2%'}}>
      <View style={{height: 40}}>
        <TouchableOpacity
          style={styleListaProduto.viewFooterCat}
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

// Em ListaProdutosPorCategoria vai ser mostrada a lista contendo as categorias e os produtos dessa categoria
const ListaDeProdutosPorCategoria = ({route, idLoja, navigation}) => {

  const [DATA, setDATA] = useState([]);
 
  const isFocused = useIsFocused();

  useEffect(async () => {
    let limit = 0;
    let tam = DATA.length;
    let dados1;
    do{
      dados1 = await getProdutoCategoria(idLoja);
      tam = dados1.length;
      limit += 1;
      
    }while(limit < 30 && tam == 0);
    setDATA(dados1);
      
  }, [isFocused])
   
  

  return (
    
    <View style={{minHeight: '100%',backgroundColor: 'white'}}>
      <SafeAreaView style={styleListaProduto.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditarProd', {item, idLoja})}>
                <View>
                  <Item
                    title={item.name}
                    image={item.photo}
                    info={item.description}
                    price={item.price}
                    promotional_price={item.promotional_price}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({section: {name, description, id}}) => (
            <View
              style={styleListaProduto.viewHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditarCat', {name, description, id, idLoja})}
                style = {{justifyContent: 'center'}}
              >
                <Text style={styleListaProduto.header}>{name}</Text>
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

