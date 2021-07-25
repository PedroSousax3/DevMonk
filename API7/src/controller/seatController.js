import { Router } from 'express'
import SeatService from '../service/seatServices.js'

const router = Router();
const service = new SeatService();


router.get('/:day/:movie/:room/:hour', async (req, resp) => {
    try {
        let { day, movie, room, hour } = req.params;
        let seats = await service.getSeats(day, movie, room, hour);
        resp.send(seats);
    } catch (e) {
        console.log(e)
        resp.status(500).send({
            error: 'An error has ocurred. Try later.'
        })
    }
})

export default router;