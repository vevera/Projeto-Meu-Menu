import * as data from '../connection.json';

async function adicionarEspecialidade(novaEspecialidade, especialidadesAtuais, idLoja) {

    var listaDeEspecialidades = especialidadesAtuais;
    if ((/[a-z0-9]/i.test(novaEspecialidade))){
        listaDeEspecialidades.push(novaEspecialidade);
    }

    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/specialtys`, {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            specialtys: listaDeEspecialidades,
       })
    })
    .catch(error  => console.log(error))

}

async function deleteEspecialidade(especialidadesAtuais, indice, idLoja) {
            
    var listaDeEspecialidades = especialidadesAtuais;
    listaDeEspecialidades.splice(indice, 1);

    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/specialtys`, {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            specialtys: listaDeEspecialidades,
    })
    })
    .catch(error  => console.log(error))
}

async function getDadosEspecialidades(idLoja) {

    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/specialtys`, {
        method: 'GET',
    })
    .then(resposta => resposta.json())
    
}


export {adicionarEspecialidade, deleteEspecialidade, getDadosEspecialidades};