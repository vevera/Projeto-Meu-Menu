import * as data from '../connection.json';
import axios from 'axios';

function cadastrarCategoria(idLoja, nomeCategoria, infoCategoria) {
    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/categories`,
      {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: nomeCategoria,
          description: infoCategoria,
        }),
      },
    )
      .then(resposta => resposta.text())
      .then(resposta => console.log(resposta))
      .catch(error => console.log(error));

}

function atualizarCategoria(idLoja, idCat, nomeCategoria, infoCategoria) {
    fetch(
      `${data.endereco}store/${idLoja}/categories`,
      {
        method: 'PUT',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          category_id: idCat,
          name: nomeCategoria,
          description: infoCategoria,
        }),
      },
    )
    .catch(error => console.log(error));
}

function removerCategoria(idLoja, idCat) {
    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/categories`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          category_id: idCat,
        }),
      },
    )
    .catch(error => console.log(error));

}

async function getProdutoCategoria(idLoja) {

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

export {cadastrarCategoria, atualizarCategoria, removerCategoria, getProdutoCategoria};