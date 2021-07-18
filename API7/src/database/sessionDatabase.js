

let db;

export default class SessaDatabase {
    static inject(conn) {
        db = conn.db('DevMonk').collection('sessao');
    }


    listDates(date) {
        return db.aggregate([
            { '$match': { data: { '$gte': date } } },
            { '$project': { data: 1, _id: 0 } },
            { '$group': { _id: '$data' } },
            { '$project': { data: '$_id', _id: 0 } },
            { '$sort': { data: 1 } },
            { '$limit': 7 }
        ]).toArray();
    }

    listMovies(date) {
        return db.find({ data: date })
                 .project({ _id: 0, filme: 1 })
                 .sort({ 'filme.nome': 1 })
                 .toArray();
    }
}
