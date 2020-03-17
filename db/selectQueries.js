const { pool } = require('./dbConnect');
const {Rooms, Reservation } = require('./dbConstants');

/**
 * gets available rooms with specified capacity
 * @param {String} start    Format "YYYY-MM-DD"
 * @param {String} end      Format "YYYY-MM-DD"
 * @param {Number} people   number of visitors
 */
const FindingAvailableRooms = async (start, end, people) => {
    let available_rooms = []
    try {
        const resp = await pool.query(
           `select id roomnumber, bedtype
            from room 
            where room.capacity = ${people}  AND not exists (
                select * from reservationroom 
                where room.id = reservationroom.roomnumber)
            UNION
            select rr.roomnumber, room.bedtype
            from reservationroom rr, room, reservation res 
            where rr.reservationid = res.reservationid 
                AND (('${start}' :: date  >= res.enddate) OR (res.startdate >= '${end}':: date)) 
                AND room.id = rr.RoomNumber 
                AND (res.pcount = ${people});`);
        console.log(resp.rows);
        available_rooms = available_rooms.concat(resp.rows);
    } catch (e) {
        console.log(e);
    } finally {
        return available_rooms;
    }
}

// TESTING
//FindingAvailableRooms('2020-03-12', '2020-03-13', 1).then((res) => {console.log(res);})

module.exports = {
    FindingAvailableRooms,
}