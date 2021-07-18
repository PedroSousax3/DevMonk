const GeneroDatabase = require('../databases/generoDatabase');

let services;
class GeneroService {
    constructor () {
        services = new GeneroDatabase();
    }
    async listarGeneros () {
        return await services.listarGeneros();
    }
}

module.exports = GeneroService;