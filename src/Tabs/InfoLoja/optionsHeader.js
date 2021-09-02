import React from 'react';
import { View, Text} from 'react-native';
import AdicionarItem from './adicionarItem';


//Renderiza um header generico que será usado em Especialidades, Horarios de Atendimento e Metodos de Pagamento
const OptionsHeader = ({idLoja, title, Filho, buttonAdd, btnTitle, atualizarData, setAtualizarData, especialidesList}) => {

    return (
        <View style = {stylesInfoLoja.HeaderEspecialidades}>
            <Text style = {stylesInfoLoja.HeaderEspecialidadesText}>
                {title} 
            </Text>
            {/*buttonAdd é um booleano que indica se precisa renderizar o botão de AdicionarItem
            no caso esse botão não é necessario em Opções de Pagamento*/
            buttonAdd && 
            <AdicionarItem
                idLoja = {idLoja}
                Componente = {Filho} //
                buttonTitle = {btnTitle} 
                atualizarData = {atualizarData} 
                setAtualizarData = {setAtualizarData}
                especialidesList = {especialidesList}
            />}
        </View>

    );

};

export default OptionsHeader;