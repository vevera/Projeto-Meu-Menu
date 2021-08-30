import * as data from '../connection.json';

async function Get(idLoja){

    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/address`, {method: 'GET'})
    .then(resposta => resposta.json())
    .then((resposta) => resposta.response)
    

}

async function Update(idLoja, pais, cidade, rua, bairro){

    fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/address`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            adress_country: pais, 
            adress_city: cidade, 
            adress_borough: rua, 
            adress_street: bairro,
    })
    })
    .catch(error  => console.log(error))

}

export {Get, Update}