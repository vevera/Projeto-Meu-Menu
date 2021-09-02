import * as data from '../connection.json';

async function login_autenticacao(senha, email) {
    return fetch(
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
      
  }

export {login_autenticacao};