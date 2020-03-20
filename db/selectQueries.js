const { pool } = require('./dbConnect');
const {Rooms, Reservation } = require('./dbConstants');
const moment=require('moment')

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
           `select id roomnumber, bedtype, pr.price, res.reservationid
            from room , roomprice pr , reservation res
            where room.capacity = ${people} 
            AND pr.roomtype = room.bedtype
            AND not exists (
                select * from reservationroom 
                where room.id = reservationroom.roomnumber)
            UNION
            select rr.roomnumber, room.bedtype, pr.price, res.reservationid
            from reservationroom rr, room, reservation res , roomprice pr
            where rr.reservationid = res.reservationid 
                AND (('${start}' :: date  >= res.enddate) OR (res.startdate >= '${end}':: date)) 
                AND room.id = rr.RoomNumber 
                AND (res.pcount = ${people})
                AND pr.roomtype = room.bedtype`);
        available_rooms = resp.rows;
        const resp2=await pool.query('select rr.roomnumber,rr.reservationid , res.startdate, res.enddate from reservationroom rr join reservation res on res.reservationid=rr.reservationid')

        //im fixing it using js and i did some research where people say its more convinient and faster  but if you came up with a query /plz include it

            let conflictrooms= resp2.rows
            for (available_room of available_rooms){
                for(room of conflictrooms){
                    if(available_room.roomnumber==room.roomnumber && available_room.reservationid!==room.reservationid){
                        if(moment(start).format('YYYY-MM-DD')>=moment(room.enddate).format("YYYY-MM-DD")||moment(room.startdate).format("YYYY-MM-DD")>=moment(end).format("YYYY-MM-DD")){
                            console.log("we chilin");
                        }else {
                            let indx=available_rooms.indexOf(available_room)
                            available_rooms.splice(indx,1)
                        }
                    }

                }
            }
            //removing the duplicate rooms from the availablerooms by O(n^2) , we can improve this to nlogn by sorting the array but its takes way more meomory space 
            for(let i=0 ;i<available_rooms.length;i++){
                for(let j=0;j<available_rooms.length;j++){
                    if(available_rooms[i].roomnumber==available_rooms[j].roomnumber){
                        available_rooms.splice(i,1)
                    }
                }

            }

           

            console.log(available_rooms)
            return available_rooms


        

    } catch (e) {
        console.log(e);
    } finally {
        return available_rooms;
    }
}

// TESTING
// FindingAvailableRooms('2020-04-03', '2020-04-06', 1)

module.exports = {
    FindingAvailableRooms,
}