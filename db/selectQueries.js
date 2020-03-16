const { pool } = require('./dbConnect');
const {Rooms, Reservation } = require('./dbConstants');

/**
 * gets available rooms with specified capacity
 * @param {Moment} startDate 
 * @param {Moment} endDate 
 * @param {Number} Capacity 
 */
const getRooms = async (startDate, endDate, Capacity) => {
    pool.query(`SELECT * FROM ${Rooms}`,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result.rows);
        }
    })
}

const FindingAvailableRooms = async (start, end, people) => {
    let available_rooms = []
    try {
        const first_res = await pool.query(
           `select id roomnumber from room 
            where room.capacity = ${people}  AND not exists (
                select * from reservationroom 
                where room.id = reservationroom.roomnumber)`);
        console.log(first_res.rows);
        first_res.rows.length == 0 ? null : available_rooms = available_rooms.concat(first_res.rows);
        const resp = await pool.query(
            `select rr.roomnumber
            from reservationroom rr  
            join  Reservation res 
            on rr.reservationid = res.reservationid AND (('${start}' :: date  >= res.enddate) OR (res.startdate >= '${end}':: date)) 
            join room 
            on room.id = rr.RoomNumber AND (res.pcount = ${people});`);
        console.log(resp.rows);
        available_rooms = available_rooms.concat(resp.rows);
    } catch (e) {
        console.log(e);
    } finally {
        return available_rooms;
    }
}

// TESTING
FindingAvailableRooms('2020-03-12', '2020-03-13', 1).then((res) => {console.log(res);})