const Router = require('express').Router();
const GeneroService = require('../services/generoService');
const services = new GeneroService();

Router.get('/', async function (request, response) {
    let generos = await services.listarGeneros();
    response.send(generos);
})

module.exports = Router;