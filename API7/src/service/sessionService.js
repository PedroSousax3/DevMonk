
import SessaoDatabase from '../database/sessionDatabase.js';
const db = new SessaoDatabase();
export default class SessaoService {
    listDates(date) {
        return db.listDates(date);
    }

    listMovies(date) {
        return db.listMovies(date);
    }

    listMoviesPorNome(date, nome) {
        return db.listMoviesPorNome(date, nome);
    }
}
