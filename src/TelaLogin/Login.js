import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

import * as data from '../connection.json';


export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [variavel, setvariavel] = useState(null);

  function login(senha, email) {
    fetch(
      `${data.endereco}store/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`,
      {
        method: 'GET',
      },
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(json => {
        setvariavel(json);
        return json;
      })
      .then(resposta => {
        if (resposta != null) {
          navigation.navigate('LojistaNavigator', resposta.id);
        } else {
          Alert.alert('Error');
        }
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerLogo}>
        <Image
          style={{
            width: 170,
            height: 155,
          }}
          source={require('../../assets/Op_1.png')}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          type="text"
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          autoCorrect={false}
          type="text"
          onChangeText={text => {
            setSenha(text);
          }}
          value={senha}
        />
        {errorLogin === true ? (
          <View>
            <Text style={{color: 'red', textDecorationLine: 'underline'}}>
              {' '}
              E-mail ou senha inválidos
            </Text>
          </View>
        ) : (
          <View>
            <Text></Text>
          </View>
        )}
        {email === '' || senha === '' ? (
          <TouchableOpacity
            style={styles.btnsubmit}
            onPress={() => setErrorLogin(true)}
            >
            <Text style={styles.textsubmit}>Acessar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnsubmit}
            onPress={() => setErrorLogin(false)}
            onPress={() => login(senha, email)}>
            <Text style={styles.textsubmit}>Acessar</Text>
          </TouchableOpacity>
        )}

        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18BC9C',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '90%',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnsubmit: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorange',
    borderRadius: 50,
    marginTop: 10,
  },
  textsubmit: {
    color: '#fff',
    fontSize: 18,
  },
  btnregister: {
    marginTop: 10,
  },
  textregister: {
    color: '#fff',
  },
  contentAlert: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningAlert: {
    paddingLeft: 10,
    color: '#bdbdbd',
    fontSize: 16,
  },
});
