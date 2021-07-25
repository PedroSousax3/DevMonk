
import { Router } from 'express'
const router = Router();

import SessionService from '../service/sessionService.js'
import montarObjetoData from '../utils/data.js';
const service = new SessionService();


router.get('/', async (req, resp) => {
    try {
        let date = montarObjetoData(new Date());
        const datas = await service.listDates(date.dateString);
        resp.send(datas.map(x => montarObjetoData(x.data)));
    } catch (e) {
        resp.status(500).send({
            error: e
        })
    }
})


router.get('/filmes/:data', async (req, resp) => {
    try {
        console.log(req.params.data)
        const filmes = await service.listMovies(req.params.data);
        resp.send(filmes);
    } catch (e) {
        resp.status(500).send({
            error: e
        })
    }
})


router.get('/filmes/:data/:nome', async (req, resp) => {
    try {
        const filmes = await service.listMoviesPorNome(req.params.data, req.params.nome);
        resp.send(filmes);
    } catch (e) {
        resp.status(500).send({
            error: e
        })
    }
})


export default router;