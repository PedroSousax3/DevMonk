import express from 'express'
import MongoDB from 'mongodb';
import ioc from './ioc.js'
import setRoutes from './routes.js';


const startServer = (conn) => {
    ioc(conn);
    
    const server = express();
    setRoutes(express, server);
    
    server.listen(
        process.env.PORT,
        () => console.log('....: server started!'))    
}

const stopServer = (e) => {
    console.log(e);
    process.exit(-1);
}


const MongoClient = MongoDB.MongoClient;
MongoClient
    .connect('mongodb+srv://pedroadmin:5612345874@cluster0.fjyes.mongodb.net', { useUnifiedTopology: true })
    .then(startServer)
    .catch(stopServer);




