const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation, ReservationRoom } = require('./dbConstants');
const { makeReservValues, makeRoomValues, makeResev_RoomValues } = require('./dbValueMaker');
const moment = require('moment');
const momentRandom = require('moment-random');
/**
 * insert values into specified table
 * @param {String} table 
 * @param {String} data 
 */
const insertIntoTable = (table, data) => {
    pool.query(`INSERT INTO ${table} VALUES ${data}`, defaultCallback);
}


/**
 * Insert a room into the DB
 * @param  {Number} id room number
 * @param  {Integer} cap room's capacity
 * @param  {String} bedtype room's bed type
 */
const insertRoom = (id, cap, bedtype) => {
    insertIntoTable(Room, makeRoomValues(id, cap, bedtype));
}

/**
 * Insert a reservation into the table
 * @param {Integer} id 
 * @param {Moment} StartDate 
 * @param {Moment} EndDate 
 * @param {Integer} price 
 * @param {Integer} pCount 
 */
const insertReservation = (id, StartDate, EndDate, price, pCount) => {
    insertIntoTable(Reservation, makeReservValues(id, StartDate, EndDate, price, pCount));
}

const insertRoomResv = (resvID, roomID) => {
    insertIntoTable(ReservationRoom, makeResev_RoomValues(resvID, roomID))   
}

var FindingAvailableRooms = async (start, end, people) => {
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
// insertRoom(1, 3, "King");
// insertRoom(2, 2, "Queen")
// insertRoom(3, 3, "King");
// insertRoom(4, 4, "King");
// insertRoom(5, 1, "King");
// insertRoom(6, 2, "King");

// insertReservation(1, moment('2020-03-15'), moment('2020-03-18'), 430,3);
// insertReservation(2, moment('2020-03-16'), moment('2020-03-24'), 430,2);
// insertReservation(3, moment('2020-03-17'), moment('2020-03-19'), 430,1);
// insertReservation(4, moment('2020-03-20'), moment('2020-03-23'), 430,4);
// insertReservation(5, moment('2020-03-14'), moment('2020-03-15'), 430,2);

// insertRoomResv(1, 1);
// insertRoomResv(2, 2);
// insertRoomResv(3, 5);
// insertRoomResv(4, 4);
// insertRoomResv(5, 6);
FindingAvailableRooms('2020-03-12', '2020-03-13', 1).then((res) => {console.log(res);})

module.exports = {
    FindingAvailableRooms
}
