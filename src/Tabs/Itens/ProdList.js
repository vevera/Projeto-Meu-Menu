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


/*const DATA = [
  {
    id: 1,
    name: 'Main dishes',
    description: 'Aqui está a descrição do produto',
    data: [
      {
        category_id: 1,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 1,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 1,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      }
    ]
  }/*,
  {
    id: 2,
    name: 'Main dishes',
    description: 'Aqui está a descrição do produto',
    data: [
      {
        category_id: 2,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 2,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 2,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      }
    ]
  },
  {
    id: 3,
    name: 'Main dishes',
    description: 'Aqui está a descrição do produto',
    data: [
      {
        category_id: 3,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 3,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 3,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      }
    ]
  },
  {
    id: 4,
    name: 'Main dishes',
    description: 'Aqui está a descrição do produto',
    data: [
      {
        category_id: 4,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 4,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      },
      {
        category_id: 4,
        name: 'Pizza',
        price: 15,
        description: 'Calabresa, queijo, tomate, pimenta',
        photo:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
      }
    ]
  }];*/

function temImagem(imagem) {
  return imagem != "\\x" ? (
    <Image
      style={styles.imagem}
      source={{
        uri: imagem,
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

//export default props => {
export default function Lista({route,  navigation}) {

  const [DATA, setDATA] = useState([])
  const idLoja = route.params.idLoja

  const [updateData, setUpdateData] = useState(false);

  function getProdutoCategoria() {
    
    fetch(`http://192.168.1.103:5000/store/21/categories`,
      {
        method: 'GET',
      }
    )
      .then(response => response.json())
      .then(response => setDATA(response.response));

    }
    
  useEffect(()=>{
    getProdutoCategoria();
  },[updateData]) 
  
  console.log(DATA);
  function Footer({section}) {
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
  function FooterCat() {
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
          onPress={() => navigation.navigate('CadastroCat')}>
          <Icon name="add" size={35} color="#18bc9c" />
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            Adicionar Categoria
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
          renderSectionHeader={({section: {name, description}}) => (
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
                onPress={() => navigation.navigate('EditarCat', {name, description})}
                style = {{justifyContent: 'center'}}
              >
                <Text style={styles.header}>{name}</Text>
              </TouchableOpacity>
            </View>
          )}
          renderSectionFooter={(section) => {return (<Footer section = {section}/>)}}
          ListFooterComponent={FooterCat}
        />
      </SafeAreaView>
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
