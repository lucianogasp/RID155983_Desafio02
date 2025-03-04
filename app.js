import { apiMethods } from './modules/apiConsume.js';
import { validationMethods } from './modules/validation.js';

window.document.addEventListener('DOMContentLoaded', () => {
    
    // Submit do formulário
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Declara as variáveis como valores dos campos do documento.
        const locationSection = document.querySelector('#location-section');
        const cepInput = document.querySelector('#cep').value;

        const weatherSection = document.querySelector('#weather-section');
        const latitudeInput = document.querySelector('#latitude').value;
        const longitudeInput = document.querySelector('#longitude').value;
        
        let isValidCep;
        let isValidWeather;
        let urlCep;
        let urlWeather;

        // Verifica e valida as entradas nos campos do formulário de Cep e Latitude e Longitude.
        if (cepInput) {
            isValidCep = validationMethods.validationCep(cepInput);
        }
        if (latitudeInput || longitudeInput) {
            isValidWeather = validationMethods.validationWeather(latitudeInput, longitudeInput);
        }

        // Se as entradas forem válidas, define as urls da API e atualiza os campos do documento.
        if (isValidCep) {
            urlCep = `https://viacep.com.br/ws/${cepInput}/json`;
            const cepApi = await apiMethods.apiSearch(urlCep);
            apiMethods.updateDocumentCep(cepApi);
            apiMethods.scrollDown(locationSection);
        }
        if (isValidWeather) {
            urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeInput}&longitude=${longitudeInput}&hourly=temperature_2m`;
            const weatherApi = await apiMethods.apiSearch(urlWeather);
            apiMethods.updateDocumentWeather(weatherApi);
            apiMethods.scrollDown(weatherSection);
        }
    })
})
