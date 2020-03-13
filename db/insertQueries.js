const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation } = require('./dbConstants');
const {makeReservValues,makeRoomValues}   = require('./dbValueMaker');
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

// I added 13 random rooms you can make it with for loops but i like randomness its up to u
insertRoom(224,1,"single");
insertRoom(332,1,"single");
insertRoom(269 ,1 ,"single");
insertRoom(111,2, "twin");
insertRoom(214,2,"twin");
insertRoom(176,2,"twin");
insertRoom(123, 3, "queen");
insertRoom(541,3,"queen");
insertRoom(322,3,"queen");
insertRoom(321,4,"King");
insertRoom(183,4,"King")
insertRoom(292,4,"King")
insertRoom(265,4,"King")



/**
 * Insert a reservation into the table
 * @param {Integer} id 
 * @param {Moment} StartDate 
 * @param {Moment} EndDate 
 * @param {Number} price 
 * @param {Integer} pCount 
 */
const insertReservation  = (id, StartDate, EndDate, price, pCount) => {
    insertIntoTable(Reservation, makeReservValues(id, StartDate, EndDate, price, pCount));
}

var convertingToDate=()=>{
    
}

