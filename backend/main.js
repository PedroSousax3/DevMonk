const express = require('express');
const server = express();
const cors = require('cors')
const MongoDB = require('mongodb');
server.use(cors());

async function conectarMongoDB () {
    const conexao = await MongoDB.connect(
        'mongodb+srv://pedroadmin:5612345874@cluster0.fjyes.mongodb.net', 
        { useUnifiedTopology: true }
    )

    return conexao.db("filmes");
}

server.get('/filmes', async function (request, response) {
    const db = await conectarMongoDB();
    let filmes = await db.collection('filmes').find().toArray();
    response.send(filmes);
});

const porta = process.env.PORT | 8080;
server.listen(porta, function () {
    console.log({ status : "ok" });
});