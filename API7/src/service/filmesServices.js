
import FilmesDatabase from '../database/filmesDatabase.js';
import montarObjetoData from '../utils/data.js';
const db = new FilmesDatabase();

export default class filmesServices {
    async listarFilmesDay (dia) {
        if (!dia) { 
            throw "Parametro informado está incorreto."    
        }
        return await db.listarFilmesDay(dia);
    }
}