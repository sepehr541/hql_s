const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation, ReservationRoom, Events, CustomerServise, Employees, EmployeeWorksIn } = require('./dbConstants');
const { makeReservValues, makeRoomValues, makeResev_RoomValues } = require('./dbValueMaker');
const moment = require('moment');
/**
 * insert values into specified table
 * @param {String} table 
 * @param {String} data 
 */
const insertIntoTable = async (table, data) => {
    try {
        pool.query(`INSERT INTO ${table} VALUES ${data}`, defaultCallback);
    } catch (error) {
        console.log(error);
    }

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


var saveReservation = async (name, start, end, phone, email, roomid, price, people) => {
    let reservationId = Math.ceil(Math.random()*10000)
    let visitorID =Math.floor(Math.random()*2000)
    let orderconfirmation=Math.floor(Math.random()*40000)
    try {
        const data = await pool.query(`
       begin;
         insert into reservation values (${reservationId},'${start}'::date , '${end}'::date , ${price} , ${people});
         insert into reservationroom values (${reservationId}, ${roomid});
         insert into visitors values (${visitorID}, '${name}','${email}', '${phone}');
         insert into visitorreservation values (${visitorID}, ${reservationId});
         insert into orderconfirmation values(${orderconfirmation},${reservationId},${visitorID});
         commit;`)

        console.log(data)
        return orderconfirmation
    } catch (e) {
        console.log(e);
    }
}

const insertEmployee = async (name, position, service, salary) => {
    const employeeID = Math.random() * 100000;
    try {
        const qres = await pool.query(`select serviceID as id 
        FROM CustomerService WHERE servicetype = '${service}'`);
        if (qres.rows.length === 0) {
            throw new Error('Invalid ServiceID')
        }
        const serviceID = qres.rows[0].id;
        await pool.query(`
        BEGIN;
        INSERT INTO ${Employees} VALUES (${employeeID}, '${name}', '${position}', ${salary});
        INSERT INTO ${EmployeeWorksIn} VALUES(${employeeID}, ${serviceID});
        END;`)
    } catch (error) {
        console.log(error);
    }
}


const insertEvent = async (name, startDate, endDate) => {

    try {
        await pool.query(`
        BEGIN;
        INSERT INTO ${Events} VALUES (default,'${name}', '${startDate}':: date,'${endDate}':: date);
        END;`)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const insertService = async (type, startAt, closesAt) => {
    insertIntoTable(CustomerServise, `(default, '${type}', '${startAt}':: time, '${closesAt}':: time)`);
}



module.exports = {
    saveReservation,
    insertEmployee,
    insertEvent,
    insertRoom
}
