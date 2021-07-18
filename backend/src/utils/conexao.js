const MongoDB = require('mongodb').MongoClient;

async function conectarMongoDB (banco) {
    const conexao = await MongoDB.connect(
        'mongodb+srv://pedroadmin:5612345874@cluster0.fjyes.mongodb.net', 
        { useUnifiedTopology: true }
    )

    return conexao.db("DevMonk");
}


module.exports = conectarMongoDB;
//"DevMonk"
//mongosh "mongodb+srv://pedroadmin:TV76eap9Agwy9D3dnK@pedrosousa.online:27017" --username pedroadmin
//mongodb://pedroadmin:TV76eap9Agwy9D3dnK@pedrosousa.online:27017,pedrosousa.online:27017,pedrosousa.online:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true

