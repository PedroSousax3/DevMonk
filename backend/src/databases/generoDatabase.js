const conectarMongoDB = require('../utils/conexao');
const { ObjectID } = require('bson')
const CollectionsDB = require('../utils/CollectionsDB')

let db;
class GeneroDatabase {
    static injectDb(connect) {
        db = connect.db('DevMonk');
    }

    async listarGeneros () {
        return await db.collection(CollectionsDB.GENEROS).find().sort({ nome : 1 }).toArray();
    }
}

module.exports = GeneroDatabase;