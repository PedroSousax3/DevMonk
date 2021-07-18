

import SessaoDatabase from "./src/database/sessionDatabase.js";
import FilmesDatabase from './src/database/filmesDatabase.js';

export default function setIoc(conn) {
    SessaoDatabase.inject(conn);
    FilmesDatabase.inject(conn);
}