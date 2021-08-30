
import * as data from '../connection.json';


async function getPromotionalPrice(store_id, product_id) {

    return fetch(`${data.endereco}store/${store_id}/promotion?id=${product_id}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .catch(error => null)
    .then(res => res)
    
}


async function getAdditionalOptions(store_id, product_id) {

    return fetch(`${data.endereco}store/${store_id}/additional_options?product_id=${product_id}`, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
    })
    .then(res => res.json())
    .then(res => res.response) // or res.json()
    .catch(error => console.log(error))
    
}

async function addAdditionalOptions(store_id, name, price, product_id) {
    
    return fetch(`${data.endereco}store/${store_id}/additional_options`, {
        method: 'POST', 
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            name: name,
            price: price,
            product_id: product_id
        }),
    })
    .catch(error => console.log(error))
    
}

async function deleteAdditionalOptions(store_id, product_id, id) {
    
    return fetch(`${data.endereco}store/${store_id}/additional_options`, {
        method: 'DELETE', 
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id: id
        }),
    })
    .catch(error => console.log(error))
    
}

function cadastrarProduto(idLoja, nomeProduto, infoProduto, precoProduto, base64Image, idCat) {
    fetch(
      `${data.endereco}store/${encodeURIComponent(idLoja)}/products`,
      {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: nomeProduto,
          description: infoProduto,
          price: precoProduto,
          photo: base64Image,
          category_id: idCat,
        }),
      },
    )
    .catch(error => console.log(error));
}

export {getAdditionalOptions, addAdditionalOptions, deleteAdditionalOptions, getPromotionalPrice, cadastrarProduto};

