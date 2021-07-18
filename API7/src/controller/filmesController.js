
import { Router } from 'express'
const router = Router();

import FilmeService from '../service/filmesServices.js'
import montarObjetoData from '../utils/data.js';
const service = new FilmeService();

router.get('/', async (req, resp) => {
    try {
        let { data } = req.query;
        data = montarObjetoData(data);
        let filmes = await service.listarFilmesDay(data);
        resp.send(filmes)
    } catch (e) {
        console.log(e)
        resp.status(500).send({
            error: e
        })
    }
})


export default router;