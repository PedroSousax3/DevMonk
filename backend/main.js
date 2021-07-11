const express = require('express');
const bodyParser = require('body-parser');
const CollectionsDB = require('./utils/CollectionsDB');
const server = express();
const conectarMongoDB = require('./services/conexao');
const { ObjectID } = require('bson');

server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());

server.use(function(req, res, next){
 w

const porta = process.env.PORT | 8080;
server.listen(porta, function () {
    console.log({ status : "ok", porta : porta });
});

function coletarFilme (request) {
    return { nome, anoLancamento, classificacao, generos, duracao, linkMais } = request.body;
}
async function inserirFilme (filme) {
    const db = await conectarMongoDB();
    return await db.collection(CollectionsDB.FILMES).insertOne(filme);
}
async function consultarFilme () {
    const db = await conectarMongoDB();
    return await db.collection(CollectionsDB.FILMES).find().toArray();
}

server.get('/filmes', async function (request, response) {
    const filmes = await consultarFilme();
    response.send(filmes.sort((a, b) => a.nome.localeCompare(b.nome)))  ;
});

server.post('/filmes',  async function (request, response) {
    let filme = coletarFilme(request);
    await inserirFilme(filme);
    response.end();
});

server.delete('/filmes/:idFilme',  async function (request, response) {
    console.log({ _id : request.params.idFilme })
    await removerFilme(request.params.idFilme)
    response.end();
});

server.delete('/filmes/:idFilme',  async function (request, response) {
    let filme = coletarFilme(request);
    filme._id = request.params.idFilme;
    await alterarFilme(filme);
    response.end();
});

async function removerFilme (idFilme) {
    const db = await conectarMongoDB();
    await db.collection(CollectionsDB.FILMES).deleteOne({ _id : ObjectID(idFilme) })
}

async function alterarFilme (filme) {
    const db = await conectarMongoDB();
    return await db.collection(CollectionsDB.FILMES).updateOne({ _id : ObjectID(filme._id)}, { $set : filme });
}

async function listarGeneros () {
    const db = await conectarMongoDB();
    return await db.collection(CollectionsDB.GENEROS).find().toArray();
}

server.get('/generos', async function (request, response) {
    let generos = await listarGeneros();
    response.send(generos);
});