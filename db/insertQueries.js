const { pool } = require('./dbConnect');
const { Room, defaultCallback, Reservation } = require('./dbConstants');
const {makeReservValues,makeRoomValues, makeResev_Roomvalues}   = require('./dbValueMaker');
const moment = require('moment');
const momentRandom = require('moment-random');
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
// insertRoom(224,1,"single");
// insertRoom(332,1,"single");
// insertRoom(269 ,1 ,"single");
// insertRoom(111,2, "twin");
// insertRoom(214,2,"twin");
// insertRoom(176,2,"twin");
// insertRoom(123, 3, "queen");
// insertRoom(541,3,"queen");
// insertRoom(322,3,"queen");
// insertRoom(321,4,"King");
// insertRoom(183,4,"King")
// insertRoom(292,4,"King")
// insertRoom(265,4,"King")



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

// insertReservation(1,moment('2020-03-15').format('YYYY-MM-DD'),moment('2020-03-18').format('YYYY-MMM-DD'),430,3)
// insertReservation(2,moment('2020-03-16').format('YYYY-MM-DD'),moment('2020-03-24').format('YYYY-MM-DD'),430,2)
// insertReservation(3,moment('2020-03-17').format('YYYY-MM-DD'),moment('2020-03-19').format('YYYY-MM-DD'),430,1)
// insertReservation(4,moment('2020-03-20').format('YYYY-MM-DD'),moment('2020-03-23').format('YYYY-MM-DD'),430,4)
// insertReservation(5,moment('2020-03-14').format('YYYY-MM-DD'),moment('2020-03-15').format('YYYY-MM-DD'),430,2)
// insertReservation(6,moment('2020-03-19').format('YYYY-MM-DD'),moment('2020-03-23').format('YYYY-MM-DD'),430,1)
// insertReservation(7,moment('2020-03-17').format('YYYY-MM-DD'),moment('2020-03-22').format('YYYY-MM-DD'),430,3)
// insertReservation(8,moment('2020-03-19').format('YYYY-MM-DD'),moment('2020-03-21').format('YYYY-MM-DD'),430,4)
// insertReservation(9,moment('2020-03-21').format('YYYY-MM-DD'),moment('2020-03-23').format('YYYY-MM-DD'),430,2)
// insertReservation(10,moment('2020-03-19').format('YYYY-MM-DD'),moment('2020-03-20').format('YYYY-MM-DD'),430,1)
// insertReservation(11,moment('2020-03-14').format('YYYY-MM-DD'),moment('2020-03-18').format('YYYY-MM-DD'),430,4)
// insertReservation(12,moment('2020-03-19').format('YYYY-MM-DD'),moment('2020-03-27').format('YYYY-MM-DD'),430,1)
// insertReservation(13,moment('2020-03-25').format('YYYY-MM-DD'),moment('2020-03-30').format('YYYY-MM-DD'),430,3)



var FindingAvailableRooms=async (start,end,people)=>{
    let available_rooms=[]
try{
   const first_res= await pool.query('select * from room where not exists (select * from reservation_room where room.id =reservation_room.room_number)');
   first_res.rows.length ==0 ?  null: available_rooms= available_rooms.concat(first_res.rows);
    const resp = await pool.query(`select ro.room_number , res.reservation_id ,roo.bedtype ,
                res.price  from reservation_room ro  join  Reservation res  on  
                 (( '${start}' ::date  >=res.enddate)or (res.startdate>='${end}'::date))join room roo on roo.id=ro.Room_Number and 
                (res.pcount=${people}) where ro.reservation_id=res.reservation_id;`);
         available_rooms= available_rooms.concat(resp.rows);
        return available_rooms;
    }catch (e) {
        console.log(e);
    }

}

// select ro.room_number , roo.bedtype, res.reservation_id ,res.price  from reservation_room ro  join  Reservation res  on  
//                 (( '2020-03-18' :: date >=res.enddate)or (res.startdate>='2020-03-24'::date)) join  room roo on roo.id=ro.Room_Number and 
//                 (res.pcount=3) where ro.reservation_id=res.reservation_id ;

module.exports={
    FindingAvailableRooms
}
