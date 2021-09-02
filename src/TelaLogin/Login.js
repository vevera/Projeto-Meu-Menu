import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Text,
} from 'react-native';
import { login_autenticacao } from '../conn/login';
import { styles } from './styleLogin.js';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [variavel, setvariavel] = useState(null);

  function login(senha, email) {
      login_autenticacao(senha, email)
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
