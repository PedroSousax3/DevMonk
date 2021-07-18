const Router = require('express').Router();
const FilmeService = require('../services/filmeService');
const services = new FilmeService();

function coletarFilme (request) {
    return { nome, anoLancamento, classificacao, generos, duracao, linkMais } = request.body;
}

Router.get('/', async function (request, response) {
    try {
        
        const filmes = await services.consultarFilme();

        response.send(filmes);
    } catch (ex) {
        response.send({
            status : 404, 
            erro : ex
        });
    }
});

Router.post('/',  async function (request, response) {
    try {
        let filme = coletarFilme(request);
        await services.inserirFilme(filme);
        response.end();
    } catch (ex) {
        response.send({
            status : 404, 
            erro : ex
        });
    }
});

Router.delete('/:idFilme',  async function (request, response) {
    try {
        await services.removerFilme(request.params.idFilme)
        response.end();
    } catch (ex) {
        response.send({
            status : 404, 
            erro : ex
        });
    }
});

Router.put('/:idFilme',  async function (request, response) {
    try {
        let filme = coletarFilme(request);
        await services.alterarFilme(request.params.idFilme, filme);
        response.end();    
    } catch (ex) {
        response.send({
            status : 404, 
            erro : ex
        });
    }
});

module.exports = Router;