import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Modal} from 'react-native';
import {View} from 'react-native';
import {
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import ListItem from './ListaRender';
import {SimpleModal} from './SimpleModal';
import {Swipeable} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as data from '../../connection.json';

export const addData = [
  {
    id: '1',
    title: 'Opção Adicional 1',
    price: 1,
  },
  {
    id: '2',
    title: 'Opção Adicional 2',
    price: 3,
  },
  {
    id: '3',
    title: 'Opção Adicional 3',
    price: 2,
  },
  {
    id: '4',
    title: 'Opção Adicional 4',
    price: 1,
  },
];

function ListaOp() {
  return (
    <View>
      <FlatList
        data={addData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem
            data={item}
            handleRight={() => alert('Opcional excluido!')}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
}

const ShowList = <ListaOp />;
const Separator = () => (
  <View style={{flex: 1, height: 1, backgroundColor: '#FFF'}} />
);

const RenderItem = ({item}) => {
  //const [shouldShow, setshouldShow] = useState(false);
  const Remove = () => {
    function removerAdicional() {
      console.log('remover opção adicional');
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#f8f8ff',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            width: 70,
            height: 70,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={removerAdicional()}>
          <Icon type="font-awesome" name="trash" size={45} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Swipeable renderRightActions={Remove}>
        <Text style={style.item}>
          {item.title}
          {'\n'}
          Valor: R${item.price}
        </Text>
      </Swipeable>
    </SafeAreaView>
  );
};

const itemsListArr = addData.map(item => (
  <RenderItem key={item.id} item={item} />
));

export default ({route, navigation}) => {
  const [prod, setprod] = useState(route.params ? route.params : {});
  const [isModalVisible, setisModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const setData = data => {
    setprod(data);
  };

  function temImagem(imagem) {
    console.log("SAIDA ++++++>>>>>>> ",imagem);
    return (imagem != '') ? (
      <Image style={style.imagem} source={{uri: `data:image/jpg;base64,${imagem}`}} />
    ) : (
      <Image
        style={style.imagem}
        source={{
          uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
        }}
      />
    );
  }

  function promocaoAtiva(promocao) {
    if (20 != null) {
      return (
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => changeModalVisible(true)}>
            <Text style={style.itemP}>
              Produto: Carne
              {'\n'}
              Desconto: 20%{'\n'}
              Novo valor: R$ 30,00
              {'\n'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 50,
              elevation: 3,
              backgroundColor: '#fff',
              borderRadius: 50,
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 10,
              marginHorizontal: '1%',
            }}
            onPress={() => {}}>
            <Icon name={'remove'} size={30} color="#ff0000" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 50,
            elevation: 3,
            backgroundColor: '#fff',
            borderRadius: 50,
            alignSelf: 'center',
            marginBottom: 10,
          }}
          onPress={() => {}}>
          <Icon name={'add'} size={30} color="#01a699" />
        </TouchableOpacity>
      );
    }
  }

  const idLoja = route.params.idLoja;
  const idProd = prod.id;
  console.log("id do produto: ", idProd)
  const [nomeProduto, setNomeProduto] = useState(prod.name);
  const [precoProduto, setPrecoProduto] = useState(prod.price.toString());
  const [infoProduto, setInfoProduto] = useState(prod.description);
  const [base64Image, setBase64Image] = useState(prod.photo);

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setBase64Image(response.assets[0].base64);
    });
  };

  function atualizarProduto() {

    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/products`,
      {
        method: 'PUT',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          product_id: idProd,
          name: nomeProduto,
          description: infoProduto,
          price: precoProduto,
          photo: base64Image,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(resposta => console.log(resposta))
      .then(() => {
        Alert.alert('Produto atualizado com sucesso!');
      })
      .catch(error => console.log(error));
  }

  function removerProduto() {
    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/products`,
      {
        method: 'DELETE',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          product_id: idProd,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(() => {
        Alert.alert('Produto removido com sucesso!');
      });
  }

  return (
    <View>
      <ScrollView style={style.form}>
        {temImagem(base64Image)}
        <TouchableOpacity style={{alignItems: 'center'}} onPress={chooseFile}>
          <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Atualizar Imagem{'\n'}
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={style.text}>Produto</Text>
          <Input
            onChangeText={name => setNomeProduto(name)}
            placeholder="informe o nome do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            value={nomeProduto ? nomeProduto : ''}
          />
          <Text style={style.text}>Preço</Text>
          <Input
            onChangeText={price => setPrecoProduto(price)}
            placeholder="informe o preço do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            keyboardType="numeric"
            value={precoProduto.toString() ? precoProduto.toString() : ''}
          />
          <Text style={style.text}>Informações</Text>
          <Input
            onChangeText={info => setInfoProduto(info)}
            placeholder="informe o preço do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            //keyboardType="numeric"
            value={infoProduto ? infoProduto : ''}
          />
        </View>
        <View style={style.header}>
          <Text style={style.viewHeader}>Opções Adicionais</Text>
        </View>
        <SafeAreaView>{itemsListArr}</SafeAreaView>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 50,
            elevation: 3,
            backgroundColor: '#fff',
            borderRadius: 50,
            alignSelf: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            setAddModalVisible(!addModalVisible);
          }}>
          <Icon name={'add'} size={30} color="#01a699" />
        </TouchableOpacity>
        <View style={style.header}>
          <Text style={style.viewHeader}>Promoção</Text>
        </View>
        {promocaoAtiva(prod.promo)}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Button
            containerStyle={style.buttonR}
            title="Remover"
            type="clear"
            titleStyle={{
              color: 'red',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              Alert.alert(
                'Remover produto',
                'Cuidado, essa ação irá remover o produto! Deseja continuar?',
                [
                  {
                    text: 'CANCELAR',
                    onPress: () => {},
                  },
                  {
                    text: 'CONFIRMAR',
                    onPress: () => {
                      removerProduto();
                      navigation.navigate('ProdList');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
          <Button
            containerStyle={style.buttonS}
            title="Salvar"
            type="clear"
            titleStyle={{
              color: 'blue',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}
            onPress={() => {
              Alert.alert(
                'Salvar alterações',
                'Deseja aplicar as alterações do Produto?',
                [
                  {
                    text: 'CANCELAR',
                    onPress: {},
                  },
                  {
                    text: 'CONFIRMAR',
                    onPress: () => {
                      atualizarProduto();
                      navigation.navigate('ProdList');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </ScrollView>
      <View>
        <Modal
          transparent={true}
          animationType="fade"
          marginTop="100"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisible(false)}>
          <SimpleModal
            changeModalVisible={changeModalVisible}
            setData={setData}
            params={prod}
          />
        </Modal>
      </View>

      <View>
        <Modal
          style={{}}
          visible={addModalVisible}
          transparent={true}
          animationType="fade"
          backgroundColor="rgba(0, 0, 0, 0.4)">
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginHorizontal: '2%',
              }}>
              <Text style={style.textView}>Adicionar Opicional</Text>
              <Text style={style.textadd}>Nome do adicional</Text>
              <Input
                placeholder="informe o nomedo adicional"
                rightIcon={{type: 'font-awesome', name: 'edit'}}
              />
              <Text style={style.textadd}>Preço</Text>
              <Input
                placeholder="informe o custo do adicional"
                rightIcon={{type: 'font-awesome', name: 'edit'}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Button
                  containerStyle={style.buttonR}
                  title="Cancelar"
                  titleStyle={{
                    color: 'white',
                  }}
                  onPress={() => {
                    setAddModalVisible(!addModalVisible);
                  }}
                />
                <Button
                  containerStyle={style.buttonS}
                  title="Adicionar"
                  titleStyle={{
                    color: 'white',
                  }}
                  onPress={() => {
                    setAddModalVisible(!addModalVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  viewHeader: {
    fontSize: 23,
    marginLeft: 10,
    fontWeight: 'bold',
    height: 40,
    color: 'white',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  modalAdicionar: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'white',
    flex: 0,
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 15,
  },
  text: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 20,
  },
  text2: {
    padding: 10,
    fontSize: 30,

    //textAlign: "center",
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#18BC9C',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    fontSize: 20,
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: '#f8f8ff',
    borderRadius: 8,
    width: '95%',
    height: 80,
    alignSelf: 'center',
  },
  itemP: {
    padding: 10,
    fontSize: 20,
    marginTop: 2,
    marginBottom: 4,
    backgroundColor: '#f8f8ff',
    borderRadius: 8,
    width: '95%',
    //height: 80,
    alignSelf: 'center',
  },
  buttonR: {
    marginHorizontal: '10%',
    marginBottom: 40,
    marginTop: 20,
    width: '40%',
    borderRadius: 50,
  },
  buttonS: {
    marginHorizontal: '10%',
    marginBottom: 40,
    marginTop: 20,
    width: '40%',
    borderRadius: 50,
  },
  imagem: {
    width: '100%',
    height: 300,
    marginBottom: 14,
  },
  btnAdd: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 3,
    backgroundColor: 'white',
  },
  btnProm: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 3,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textView: {
    margin: 5,
    fontSize: 26,
    fontWeight: 'bold',
  },
  textadd: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
