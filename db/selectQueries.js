const { pool } = require('./dbConnect');
const { Rooms, Reservation } = require('./dbConstants');
const moment = require('moment')

/**
 * gets available rooms with specified capacity
 * @param {String} start    Format "YYYY-MM-DD"
 * @param {String} end      Format "YYYY-MM-DD"
 * @param {Number} people   number of visitors
 */
const FindingAvailableRooms = async (start, end, people) => {
    let available_rooms = []
    try {
        const resp = await pool.query(
            `select id roomnumber, bedtype, pr.price
            from room, roomprice pr
            where room.capacity = ${people}
            AND pr.roomtype = room.bedtype
            AND id not in 
            (select room.id
            from reservationroom rr, room, reservation res
            where rr.reservationid = res.reservationid 
                AND room.id = rr.RoomNumber 
                AND ((('${start}':: date  < res.enddate) AND ('${start}':: date >= res.startdate))
                    OR (('${end}':: date  <= res.enddate) AND ('${end}':: date > res.startdate )))
                    OR (('${start}':: date <= res.startdate) AND ('${end}':: date >= res.enddate))
                AND res.pcount = ${people})`);
        available_rooms = resp.rows;
        console.log(available_rooms);
        // const resp2=await pool.query('select rr.roomnumber,rr.reservationid , res.startdate, res.enddate from reservationroom rr join reservation res on res.reservationid=rr.reservationid')

        // //im fixing it using js and i did some research where people say its more convinient and faster  but if you came up with a query /plz include it

        //     let conflictrooms= resp2.rows
        //     console.log(available_rooms);
        //     console.log(conflictrooms);
        //     for (available_room of available_rooms){
        //         for(room of conflictrooms){
        //             if(available_room.roomnumber==room.roomnumber && available_room.reservationid!==room.reservationid){
        //                 if(moment(start).format('YYYY-MM-DD')>=moment(room.enddate).format("YYYY-MM-DD")||moment(room.startdate).format("YYYY-MM-DD")>=moment(end).format("YYYY-MM-DD")){
        //                     console.log("we chilin");
        //                 }else {
        //                     let indx=available_rooms.indexOf(available_room)
        //                     available_rooms.splice(indx,1)
        //                 }
        //             }

        //         }
        //     }
        //     //removing the duplicate rooms from the availablerooms by O(n^2) , we can improve this to nlogn by sorting the array but its takes way more space 
        //     for(let i=0 ;i<available_rooms.length;i++){
        //         for(let j=0;j<available_rooms.length;j++){
        //             if(available_rooms[i].roomnumber==available_rooms[j].roomnumber){
        //                 available_rooms.splice(i,1)
        //             }
        //         }

        //     }
        //     console.log(available_rooms)
        return available_rooms
    } catch (e) {
        console.log(e);
    } finally {
        return available_rooms;
    }
}

/**
 * return all rooms with their associated reservations
 */
const RoomsResvDates = async () => {
    const result = await pool.query(
        `select room.id roomnumber, res.startDate, res.endDate, room.capacity capacity
        from room, reservation res, reservationroom rr
        where room.id = rr.roomnumber
            AND res.reservationid = rr.reservationid`
    )
    console.log("Room,     StartDate,   EndDate,     Cap")
    result.rows.forEach(({ roomnumber, startdate, enddate, capacity }) => {
        console.log(roomnumber,
            ' '.repeat(8 - roomnumber.toString().length),
            moment(startdate).format('YYYY-MM-DD'), ' ', moment(enddate).format('YYYY-MM-DD'),
            "  ", capacity)
    })
}
// TESTING
RoomsResvDates()
FindingAvailableRooms('2020-04-10', '2020-04-12', 4)

module.exports = {
    FindingAvailableRooms,
}