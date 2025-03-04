import { customErrors } from './customizedErrors.js';

// Cosumindo API
async function apiSearch(url) {
    try {
        const response = await fetch(url);
        console.log('Response Object:');
        console.log(response);
        console.log(`Response Status: ${response.status}`);
        if (!response.ok) {
            throw new customErrors.RequestError('', response);
        }
        const responseJson = await response.json();
        console.log('Response Json:');
        console.log(responseJson);
        if (responseJson.erro) {
            throw new customErrors.JsonConvertError('', responseJson);
        }
        return responseJson;
        
    } catch (err) {
        if (err instanceof customErrors.RequestError) {
            err.raiseAlert(err.alertMessage);
        } else if (err instanceof customErrors.JsonConvertError) {
            err.raiseAlert(err.alertMessage);
        } else {
            alert(err);
        }
    }
}

// Atualizando documento com CEP
async function updateDocumentCep(cep) {
    const logradouro = document.querySelector('#logradouro');
    const bairro = document.querySelector('#bairro');
    const localidade = document.querySelector('#localidade');

    logradouro.innerHTML = cep.logradouro;
    bairro.innerHTML = cep.bairro;
    localidade.innerHTML = cep.uf;
}
// Atualizando documento com previsão do tempo
async function updateDocumentWeather(weather) {
    const resultTemp = document.querySelector('#temperature');
    const temperatureValue = weather.hourly.temperature_2m[0];
    const temperatureUnit = weather.hourly_units.temperature_2m;
    resultTemp.innerHTML = `Previsão de tempo de acordo com a região: ${temperatureValue} ${temperatureUnit}`;
}

// Realizando um Scroll Down para a visualização dos resultados nos campos
function scrollDown(elementSection) {
    elementSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

export const apiMethods = {
    apiSearch, 
    updateDocumentCep, 
    updateDocumentWeather,
    scrollDown
};