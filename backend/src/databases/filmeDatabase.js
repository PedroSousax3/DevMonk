const conectarMongoDB = require('../utils/conexao')
const CollectionsDB = require('../utils/CollectionsDB')
const { ObjectID } = require('bson')

let db;
class FilmesDatabase {
    static injectDb (connect) {
        db = connect.db('DevMonk')
    }
    async inserirFilme (filme) {
        return await db.collection(CollectionsDB.FILMES).insertOne(filme);
    }
    async consultarFilme () {
        return await db.collection(CollectionsDB.FILMES).find().sort({ nome : 1 }).toArray();
    }
    async removerFilme (idFilme) {
        await db.collection(CollectionsDB.FILMES).deleteOne({ _id : ObjectID(idFilme) })
    }
    async alterarFilme (idFilme, filme) {
        return await db.collection(CollectionsDB.FILMES)
                        .updateOne(
                            { _id : ObjectID(idFilme)}, 
                            { $set : filme }
                        );
    }
}

module.exports = FilmesDatabase;