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

// const saveReservation = async (roomNumber, resvid, startDate, endDate, price, pcount) => {
//     pool.query(
//         `BEGIN;
//            INSERT INTO reservation VALUES (${resvid}, '${startDate}', '${endDate}', ${price}, ${pcount});
//            INSERT INTO reservationroom VALUES (${resvid}, ${roomNumber});
//         END;`,
//     defaultCallback);
// }


var saveReservation = async (name, start, end, phone, email, roomid, price, people) => {
    let reservationId = Math.ceil(Math.random()*10000)
    let visitorID =Math.floor(Math.random()*2000)
    console.log(reservationId)
    console.log(visitorID)
    console.log(phone)
    let orderconfirmation=Math.floor(Math.random()*40000)
    // let reservationId=2
    // let visitorID=5
    // let orderconfirmation=10
    console.log(email)
    console.log(start)
    console.log(end)
    console.log(phone)


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
// begin;
//         insert into reservation values (130,'2020-04-03'::date , '2020-04-10'::date , 7878 , 1 , now() );
//          insert into reservationroom values (130, 1);
//          insert into visitor values (1000, 'amir sayyar', '7787517531', 'amirsa@gamil.com');
//          commit;


//saveReservation(5, 14, '2020-04-03', '2020-04-06', 650, 1);
// saveReservation('amir', '2020-04-03', '2020-04-10', '7787517531', 'amirsa@gamil.com', 1 , 600, 1);

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
    console.log('name: ', name);
    console.log('start: ', startDate);
    console.log('end: ', endDate);
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


function intializeCustomerService() {
    const services = [
        ['Management', '09:00', '17:00'],
        ['HouseKeeping', '00:00', '12:00'],
        ['Reception', '00:00', '12:00'],
        ['RoomService', '00:00', '12:00'],
    ]

    for (service of services) {
        insertService(service[0], service[1], service[2]);
    }
}


// intializeCustomerService()

module.exports = {
    saveReservation,
    insertEmployee,
    insertEvent,
    insertRoom
}
