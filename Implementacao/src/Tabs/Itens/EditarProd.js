import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Modal} from 'react-native';
import {View} from 'react-native';
import {Alert, SafeAreaView, Text, ScrollView, Image} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {SimpleModal} from './SimpleModal';
import {Swipeable} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {styleEditarProduto} from './StyleItem.js';

import {
  getAdditionalOptions,
  addAdditionalOptions,
  deleteAdditionalOptions,
  getPromotionalPrice,
  removerPromocao,
  atualizarProduto,
  removerProduto,
} from '../../conn/produtos.js';

function removerAdicional(idLoja, idProd, id) {
  deleteAdditionalOptions(idLoja, idProd, id);
}

const Remove = ({idLoja, id, product_id, atualizarData, setAtualizarData}) => {
  return (
    <View style={styleEditarProduto.viewRemove}>
      <TouchableOpacity
        style={styleEditarProduto.touchableRemove}
        onPress={() => {
          removerAdicional(idLoja, product_id, id);
          setAtualizarData(!atualizarData);
        }}>
        <Icon type="font-awesome" name="trash" size={45} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const RenderItem = ({item, idLoja, atualizarData, setAtualizarData}) => {
  return (
    <SafeAreaView>
      <Swipeable
        renderRightActions={() => (
          <Remove
            atualizarData={atualizarData}
            setAtualizarData={setAtualizarData}
            idLoja={idLoja}
            id={item.id}
            product_id={item.product_id}
          />
        )}>
        <Text style={styleEditarProduto.item}>
          {item.name} - R${item.price}
        </Text>
      </Swipeable>
    </SafeAreaView>
  );
};

const OpcoesAdicionais = ({
  atualizarOpcoesData,
  setAtualizarData,
  idLoja,
  idProd,
}) => {
  const [addData, setAddData] = useState(null);
  const [itemsListArr, setItemsListArr] = useState([]);

  useEffect(() => {
    getAdditionalOptions(idLoja, idProd).then(resp => setAddData(resp));
  }, [atualizarOpcoesData]);

  useEffect(() => {
    if (addData != null) {
      setItemsListArr(
        addData.map(item => (
          <RenderItem
            key={item.id}
            item={item}
            idLoja={idLoja}
            atualizarData={atualizarOpcoesData}
            setAtualizarData={setAtualizarData}
          />
        )),
      );
    }
  }, [addData]);

  return <SafeAreaView>{itemsListArr}</SafeAreaView>;
};

const RenderProdutoInformacoes = ({prod, idLoja, navigation}) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const idProd = prod.id;
  console.log(idProd);
  const [nomeProduto, setNomeProduto] = useState(prod.name);
  const [precoProduto, setPrecoProduto] = useState(prod.price.toString());
  const [infoProduto, setInfoProduto] = useState(prod.description);
  const [promo, setPromo] = useState(prod.promotional_price);
  const [base64Image, setBase64Image] = useState(prod.photo);

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  function temImagem(imagem) {
    return imagem != '' ? (
      <Image
        style={styleEditarProduto.imagem}
        source={{uri: `data:image/jpg;base64,${imagem}`}}
      />
    ) : (
      <Image
        style={styleEditarProduto.imagem}
        source={{
          uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png',
        }}
      />
    );
  }

  const PromocaoAtiva = ({
    preco_normal,
    promocao,
    nome,
    atualizarPromo,
    setAtualizarData,
  }) => {
    const [promocaoPrice, setPromocaoPrice] = useState({
      promotional_price: null,
    });

    const [disconto, setDisconto] = useState(0);

    useEffect(() => {
      getPromotionalPrice(idLoja, idProd).then(res => {
        if (res != null) {
          setPromocaoPrice(res);
        }
      });
    }, [atualizarPromo]);

    useEffect(() => {
      setDisconto(
        promocaoPrice.promotional_price === null
          ? 0
          : 100 - (promocaoPrice.promotional_price * 100) / preco_normal,
      );
    }, [promocaoPrice]);

    if (promocaoPrice.promotional_price != null) {
      return (
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => changeModalVisible(true)}>
            <Text style={styleEditarProduto.itemP}>
              {nome}
              {'\n'}
              Desconto:{' '}
              <Text style={{fontWeight: 'bold'}}>
                {disconto.toFixed(2)}%{'\n'}
              </Text>
              Novo valor: 
              <Text style={{fontWeight: 'bold'}}>
                <Text style = {{paddingRight: 0.7}}>R$</Text>{promocaoPrice.promotional_price.toFixed(2)}
              </Text>
              {'\n'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleEditarProduto.styleBtnAdicionarPromo}
            onPress={() => {
              removerPromocao(idLoja, idProd);
              setAtualizarData(!atualizarPromo);
            }}>
            <Icon name={'remove'} size={30} color="#ff0000" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styleEditarProduto.styleBtnRemoverPromo}
          onPress={() => {
            changeModalVisible(true);
          }}>
          <Icon name={'add'} size={30} color="#01a699" />
        </TouchableOpacity>
      );
    }
  };

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

  function atualizarInfoProduto() {
    atualizarProduto(
      idLoja,
      idProd,
      nomeProduto,
      infoProduto,
      precoProduto,
      base64Image,
    )
      .then(() => {
        Alert.alert('Produto atualizado com sucesso!');
      })
      .catch(error => console.log(error));
  }

  function removerUmProduto() {
    removerProduto(idLoja, idProd)
      .then(() => {
        Alert.alert('Produto removido com sucesso!');
      })
      .catch(error => console.log(error));
  }

  const [atualizarOpcoesData, setAtualizarData] = useState(true);
  const [atualizarPromocaoData, setAtualizarPromocaoData] = useState(true);

  const [nameAdd, setNameAdd] = useState('');
  const [priceAdd, setPriceAdd] = useState('');

  return (
    <View>
      <ScrollView style={styleEditarProduto.form}>
        {temImagem(base64Image)}
        <TouchableOpacity style={{alignItems: 'center'}} onPress={chooseFile}>
          <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Atualizar Imagem{'\n'}
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={styleEditarProduto.text}>Produto</Text>
          <Input
            onChangeText={name => setNomeProduto(name)}
            placeholder="informe o nome do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            value={nomeProduto ? nomeProduto : ''}
          />
          <Text style={styleEditarProduto.text}>Preço</Text>
          <Input
            onChangeText={price => setPrecoProduto(price)}
            placeholder="informe o preço do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            keyboardType="numeric"
            value={precoProduto.toString() ? precoProduto.toString() : ''}
          />
          <Text style={styleEditarProduto.text}>Informações</Text>
          <Input
            onChangeText={info => setInfoProduto(info)}
            placeholder="informe o preço do produto"
            rightIcon={{type: 'font-awesome', name: 'edit'}}
            value={infoProduto ? infoProduto : ''}
          />
        </View>
        <View style={styleEditarProduto.header}>
          <Text style={styleEditarProduto.viewHeader}>Opções Adicionais</Text>
        </View>
        <OpcoesAdicionais
          atualizarOpcoesData={atualizarOpcoesData}
          setAtualizarData={setAtualizarData}
          idLoja={idLoja}
          idProd={idProd}
        />
        <TouchableOpacity
          style={styleEditarProduto.buttonAddOP}
          onPress={() => {
            setAddModalVisible(!addModalVisible);
          }}>
          <Icon name={'add'} size={30} color="#01a699" />
        </TouchableOpacity>
        <View style={styleEditarProduto.header}>
          <Text style={styleEditarProduto.viewHeader}>Promoção</Text>
        </View>
        <PromocaoAtiva
          preco_normal={precoProduto}
          promocao={promo}
          nome={nomeProduto}
          atualizarPromo={atualizarPromocaoData}
          setAtualizarData={setAtualizarPromocaoData}
        />
        <View style={styleEditarProduto.viewButtons}>
          <Button
            containerStyle={styleEditarProduto.buttonR}
            title="Remover"
            type="clear"
            titleStyle={styleEditarProduto.buttonRTitle}
            onPress={() => {
              Alert.alert(
                'Remover produto',
                'Cuidado, essa ação irá remover o produto! Deseja continuar?',
                [
                  {
                    text: 'CANCELAR',
                  },
                  {
                    text: 'CONFIRMAR',
                    onPress: () => {
                      removerUmProduto();
                      navigation.navigate('ProdList');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
          <Button
            containerStyle={styleEditarProduto.buttonS}
            title="Salvar"
            type="clear"
            titleStyle={styleEditarProduto.buttonSTitle}
            onPress={() => {
              Alert.alert(
                'Salvar alterações',
                'Deseja aplicar as alterações do Produto?',
                [
                  {
                    text: 'CANCELAR',
                  },
                  {
                    text: 'CONFIRMAR',
                    onPress: () => {
                      atualizarInfoProduto();
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
            params={prod}
            idLoja={idLoja}
            navigation={navigation}
            atualizarPromo={atualizarPromocaoData}
            setAtualizar={setAtualizarPromocaoData}
          />
        </Modal>
      </View>

      <View style={{marginHorizontal: 20}}>
        <Modal
          visible={addModalVisible}
          transparent={true}
          animationType="fade"
          backgroundColor="rgba(0, 0, 0, 0.4)">
          <View style={styleEditarProduto.viewModal1}>
            <View style={styleEditarProduto.viewModal2}>
              <Text style={styleEditarProduto.textView}>
                Adicionar Opicional
              </Text>
              <Text style={styleEditarProduto.textadd}>Nome do adicional</Text>
              <Input
                placeholder="informe o nomedo adicional"
                rightIcon={{type: 'font-awesome', name: 'edit'}}
                onChangeText={name => {
                  setNameAdd(name);
                }}
              />
              <Text style={styleEditarProduto.textadd}>Preço</Text>
              <Input
                placeholder="informe o custo do adicional"
                rightIcon={{type: 'font-awesome', name: 'edit'}}
                onChangeText={priceAdd => setPriceAdd(priceAdd)}
                keyboardType="numeric"
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Button
                  containerStyle={styleEditarProduto.buttonR}
                  title="Cancelar"
                  titleStyle={{
                    color: 'white',
                  }}
                  onPress={() => {
                    setAddModalVisible(!addModalVisible);
                  }}
                />
                <Button
                  containerStyle={styleEditarProduto.buttonS}
                  title="Adicionar"
                  titleStyle={{
                    color: 'white',
                  }}
                  onPress={() => {
                    addAdditionalOptions(idLoja, nameAdd, priceAdd, idProd);
                    setAddModalVisible(!addModalVisible);
                    setAtualizarData(!atualizarOpcoesData);
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

export default ({route, navigation}) => {
  const prod = route.params.item;

  const idLoja = route.params.idLoja;

  return (
    <RenderProdutoInformacoes
      prod={prod}
      idLoja={idLoja}
      navigation={navigation}
    />
  );
};
