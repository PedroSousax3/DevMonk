let db;

class SeatDatabase {
    static inject(conn) {
        db = conn.db('DevMonk').collection('lugares');
    }

    async getSeats(day, movie, room, hour) {
        return await db.find({ 
          "data": day, 
          "filme": movie,
          "sala": room, 
          "hora": hour 
        })
        .sort({ 
          "lugar.letra": -1, 
          "lugar.numero": 1 
        })
        .project({ 
          "_id": 0
        })
        .toArray();
    }
}

export default SeatDatabase;