const FilmeDatabase = require('../databases/filmeDatabase');

let services;
class FilmeService {
    constructor () {
        services = new FilmeDatabase();
    }
    async inserirFilme (filme) {
        if (!filme.nome)
            throw "Nome do filme não foi informado";
        if (!isNumber(filme.anoLancamento) && filme.anoLancamento === 0)
            throw "Informe o ano de lançamento do filme.";

        await services.inserirFilme(filme);
    }
    async alterarFilme (idFilme, filme) {
        if (!filme.nome)
            throw "Nome do filme não foi informado";
        if (!isNumber(filme.anoLancamento) && filme.anoLancamento === 0)
            throw "Informe o ano de lançamento do filme.";
        if (!idFilme)
            throw "Filme não informado.";

        await services.inserirFilme(idFilme, filme);
    }
    async removerFilme (idFilme) {
        if (!idFilme)
            throw "Filme não informado.";

        await services.removerFilme(idFilme);
    }
    async consultarFilme () {
        return await services.consultarFilme();
    }
}

module.exports = FilmeService;