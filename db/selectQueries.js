const { pool } = require('./dbConnect');
const {Rooms, Reservation } = require('./dbConstants');
const getRooms = async (startDate, endDate, Capacity) => {
    pool.query(`SELECT roomType FROM ${Rooms}`)
    .then()
}