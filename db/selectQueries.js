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