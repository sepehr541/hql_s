const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation } = require('./dbConstants');
const  makeRoomValues  = require('./dbValueMaker');
const moment = require('moment');

/**
 * insert values into a specific table
 * @param {String} table 
 * @param {String} data 
 */
const insertIntoTable = (table, data) => {
    pool.query(`INSERT INTO ${table} VALUES ${data}`, defaultCallback);
}




/**
 * Insert a room into the DB
 * @param  {Number} id room number
 * @param  {[type]} cap room's capacity
 * @param  {String} bedtype room's bed type
 */
const insertRoom = (id, cap, bedtype) => {
    insertIntoTable(Room, makeRoomValues(id, cap, bedtype));
}

insertRoom( 223, 3, "queen" )

/**
 * Insert a reservation into the table
 * @param {Integer} id 
 * @param {Moment} StartDate 
 * @param {Moment} EndDate 
 * @param {Number} price 
 * @param {Integer} pCount 
 */
const insertReservation  = (id, StartDate, EndDate, price, pCount) => {
    insertIntoTable(Reservation, makeResvValues(id, StartDate, EndDate, price, pCount));
}

