
import * as data from '../connection.json';


async function login(name, phone, email, password, specialtys, adress_country, adress_city, adress_borough, adress_street) {

    return fetch(`${data.endereco}store/sign`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            password: password,
            specialtys: specialtys,
            adress_country: adress_country,
            adress_city: adress_city,
            adress_borough: adress_borough,
            adress_street: adress_street,
        })
    })
    .then(res => res.ok) // or res.json()
    .catch(error => console.log(error))
    
}

export default login;