import { customErrors } from './customizedErrors.js';

// Validando entradas dos campos do documento.

// CEP
function validationCep(cep) {
    const regex = /^(\d{8}|\d{5}-\d{3})$/;
    const validation = regex.test(cep.trim());

    if (!validation) {
        const errorRegex = new customErrors.InputError('CEP inválido! Utilize a formatação XXXXX-XXX ou apenas números ao preencher o campo CEP.');
        errorRegex.raiseAlert(errorRegex.alertMessage);
        return false;
    }
    return true;
}
// Tempo
function validationWeather(latitude, longitude) {
    if (Boolean(latitude) != Boolean(longitude)) {
        const errorRequiredInput = new customErrors.InputError('Valores inválidos! Ambos os campos de Latitude e Longitude precisam ser preenchidos.');
        errorRequiredInput.raiseAlert(errorRequiredInput.alertMessage);
        return false;
    }
    const regex = /^-?\d+.?\d*$/;
    const regexValidation = regex.test(latitude.trim()) && regex.test(longitude.trim());
    
    const lat = parseFloat(parseFloat(latitude).toFixed(2));
    const long = parseFloat(parseFloat(longitude).toFixed(2));

    const rangeValidation = (Math.abs(lat) <= 90 && Math.abs(long) <= 180) ? true : false;
    
    if (!regexValidation) {
        const errorRegex = new customErrors.InputError('Valores inválidos! Latitude e Longitude precisam ser valores numéricos.');
        errorRegex.raiseAlert(errorRegex.alertMessage);
        return false;
    }
    if (!rangeValidation) {
        const errorRange = new customErrors.InputError('Valores inválidos! Latitude precisa pertencer ao intervalo [-90, 90].\nLongitude precisa pertencer ao intervalo [-180, 180].');
        errorRange.raiseAlert(errorRange.alertMessage);
        return false;
    }

    return true;
}

export const validationMethods = {
    validationCep, 
    validationWeather 
};