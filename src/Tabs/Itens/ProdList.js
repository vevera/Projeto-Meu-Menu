import React from 'react';
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

const DATA = [
  {
    title: 'Main dishes',
    descricao: 'Aqui está a descrição do produto',
    data: [
      {
        name: 'Pizza',
        price: 15,
        info: 'Calabresa, queijo, tomate, pimenta',
        image:
          'https://img.freepik.com/fotos-gratis/uma-fatia-cortada-da-pizza-de-pepperoni-classica-com-rolos-de-pimenta-verde_114579-1963.jpg?size=626&ext=jpg',
        promo: {desconto: 50, validade: '16:00 04/10'},
      },
      {
        name: 'Burguer',
        price: 12,
        info: 'Carne, queijo, bacon',
        promo: {},
      },
      {
        name: 'Risotto',
        price: 12,
        info: 'tradicional',
        promo: {},
      },
    ],
  },
  {
    title: 'Sides',
    descricao: 'Aqui está a descrição do produto',
    data: [
      {
        name: 'French Fries',
        price: 10,
        info: 'batata, bacon, molho especial',
        promo: {},
      },
      {
        name: 'Onion Rings',
        price: 12,
        info: 'Cebola, molho especial',
        promo: {},
      },
      {
        name: 'Fried Shrimps',
        price: 8,
        info: 'Especial',
        promo: {},
      },
    ],
  },
  {
    title: 'Drinks',
    descricao: 'Aqui está a descrição do produto',
    data: [
      {
        name: 'Water',
        price: 3,
        info: '250ml, sem gás',
        promo: {},
      },
      {
        name: 'Coke',
        price: 4,
        info: '500ml',
        promo: {},
      },
      {
        name: 'Beer',
        price: 4,
        info: '250ml',
        promo: {},
      },
    ],
  },
  {
    title: 'Desserts',
    descricao: 'Aqui está a descrição do produto',
    data: [
      {
        name: 'Cheese Cake',
        price: 9,
        info: 'queijo, bolo',
        promo: {},
      },
      {
        name: 'Ice Cream',
        price: 6,
        info: 'Chocolate, morango e creme',
        promo: {},
      },
      {
        name: 'Fried Shrimps',
        price: 8,
        info: 'Epecial',
        promo: {},
      },
    ],
  },
];

function temImagem(imagem) {
  return imagem ? (
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

export default props => {
  function Footer() {
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
          onPress={() => props.navigation.navigate('CadastroProd')}>
          <Icon name="add" size={35} color="green" />
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
          onPress={() => props.navigation.navigate('CadastroCat')}>
          <Icon name="add" size={35} color="green" />
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
                onPress={() => props.navigation.navigate('EditarProd', item)}>
                <View>
                  <Item
                    title={item.name}
                    image={item.image}
                    info={item.info}
                    price={item.price}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                backgroundColor: '#036d19',
                height: 50,
                borderRadius: 10,
                width: '98%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('EditarCat', title)}>
                <Text style={styles.header}>{title}</Text>
              </TouchableOpacity>
            </View>
          )}
          renderSectionFooter={Footer}
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
