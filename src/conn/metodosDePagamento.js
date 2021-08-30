import * as data from '../connection.json';

async function updatePayment(store_id, aceita_credito, aceita_debito, aceita_dinheiro, aceita_pix) {
    
    return fetch(`${data.endereco}store/${store_id}/payment`, {
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