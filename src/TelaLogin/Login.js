import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {TouchableOpacityBase} from 'react-native';
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

export default ({navigation}) => {
  const [email, setEmail] = useState('airton.neto@delfosim.com');
  const [senha, setSenha] = useState('droped123');
  const [errorLogin, setErrorLogin] = useState('');
  const [variavel, setvariavel] = useState(null);

  useEffect(() => {}, []);

  function login(senha, email) {
    console.log('semha: ' + senha + ' email: ' + email);

    fetch(
      `http://192.168.1.103:5000/store/login?email=${encodeURIComponent(
        email,
      )}&password=${encodeURIComponent(senha)}`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        
        if (response.ok){
          
          return response.json()
        
        }
        else{

          return null

        }
       
      })
      .then((json) => {
        console.log(json); setvariavel(json); return json;
      })
      .then(
        (resposta) => {
          if (resposta != null) {
            console.log(resposta.id);
            navigation.navigate('LojistaNavigator', resposta.id);
        } else {
          Alert.alert('Error');
        }}
      )   
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
          //secureTextEntry={true}
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
            <Text style={{color: 'red'}}> E-mail ou senha inválidos</Text>
          </View>
        ) : (
          <View></View>
        )}
        {email === '' || senha === '' ? (
          <TouchableOpacity style={styles.btnsubmit} onPress={() => {}}>
            <Text style={styles.textsubmit}>Acessar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnsubmit}
            onPress={() => login(senha, email)}>
            <Text style={styles.textsubmit}>Acessar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CadastroLogin');
          }}
          style={styles.btnregister}>
          <Text style={styles.textregister}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10d177',
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
