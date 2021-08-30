import * as data from '../connection.json';


function adicionarHorario(idLoja, diaInicio, diaFim, horaInicio, horaFim) {

    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/schedules`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            dow_start: diaInicio,
            dow_end: diaFim,
            opens_at: horaInicio.getHours() + ":" + horaInicio.getMinutes(),
            closes_at: horaFim.getHours() +":"+ horaFim.getMinutes(),
       })
    })

}

async function deletaHorario(idLoja, id) {
            
    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/schedules/delete`, {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            schedule_id: id,
       })
    })

}

async function setaDadosHorario(idLoja) {
        
    return fetch(`${data.endereco}store/${encodeURIComponent(idLoja)}/schedules`, {
        method: 'GET',
    })
    

}

export {adicionarHorario, deletaHorario, setaDadosHorario};
