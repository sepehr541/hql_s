const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation, ReservationRoom } = require('./dbConstants');
const { makeReservValues, makeRoomValues, makeResev_RoomValues } = require('./dbValueMaker');
const moment = require('moment');

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

const saveReservation = () => {
    pool.query(
        `BEGIN TRY
            BEGIN TRANSACTION

            END TRANSACTION
         END TRY
         BEGIN CATCH
         END CATCH`
    )
}


module.exports = {

}
