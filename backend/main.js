const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json());

const FilmeController = require('./src/controllers/filmeController')
server.use('/filmes', FilmeController)

const GeneroController = require('./src/controllers/generoController')
server.use('/generos', GeneroController)

const porta = process.env.PORT | 8080;
server.listen(porta, function () {
    console.log({ status : "ok", porta : porta });
});

function startServer(conn) { 
    const filmeDatabase = require('./src/databases/filmeDatabase')
    filmeDatabase.injectDb(conn);
    const generoDatabase = require('./src/databases/generoDatabase')
    generoDatabase.injectDb(conn);
}

const MongoDB = require('mongodb').MongoClient;
MongoDB
    .connect('mongodb+srv://pedroadmin:5612345874@cluster0.fjyes.mongodb.net', { useUnifiedTopology: true })
    .then(startServer)
    .catch(ex => {
        console.log(ex);
        process.exit();
    });