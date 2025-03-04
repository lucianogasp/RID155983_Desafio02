// Classes de personalização de erros

// Superclasse: exibir mensagem de erro personalizado ao usuário.
class MessageError extends Error{

    constructor (message) {
        super(message);
    }
    
    raiseAlert(alertMessage) {
        alert(alertMessage);
    }
}

// Subclasses: definir mensagem de erro personalizado.

class InputError extends MessageError {
    constructor (message) {
        super(message);
        this.name = 'InputError';
        this.alertMessage = `>> ${this.name}:\n${this.message}`;
    }
}

class RequestError extends MessageError {
    constructor (message, response) {
        super(message);
        this.name = 'RequestError';
        this.statusCode = response.status;
        this.statusCodeText = undefined;
        this.setStatusCodeText(this.statusCode);
        this.alertMessage = `>> ${this.name}:\n${this.message}\nStatus Code: ${this.statusCode} (${this.statusCodeText})`;
    }

    setStatusCodeText(statusCode) {
        if (statusCode == 400) {
            this.statusCodeText = 'Bad Request';
        } else if (statusCode == 404) {
            this.statusCodeText = 'Not Found';
        }
    }
}

class JsonConvertError extends MessageError {
    constructor (message, responseJson) {
        super(message);
        this.name = 'JsonConvertError';
        this.message = 'Erro na leitura do arquivo response.json da API.';
        this.reason = responseJson.reason || undefined;
        this.alertMessage = `>> ${this.name}:\n${this.message}\nReason: ${this.reason}
        `;
    }
}

export const customErrors = {
    MessageError,
    InputError,
    RequestError,
    JsonConvertError
}
