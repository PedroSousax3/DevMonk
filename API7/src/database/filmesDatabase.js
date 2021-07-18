let db;

export default class FilmesDatabase {
    static inject(conn) {
        db = conn.db('DevMonk').collection('sessao');
    }

    async listarFilmesDay (dia) {
        return await db.aggregate([
            { '$match' : { data : dia.dateString }},
            { '$project' : { data : 1, filme : 1, horarios : 1 } }
        ]).toArray();
    }
}