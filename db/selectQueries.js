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
        // return available_rooms
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
// RoomsResvDates()
// FindingAvailableRooms('2020-04-10', '2020-04-11', 1)


const getFromDB = async (query) => {
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all employess in alphabetical order
 */
const getEmployees = async () => {
    return await getFromDB(`select * from employees`)
}

const getEmployeeWithID = async (id) => {
    return await getFromDB(`select * from employees where employeeID = ${id}`)
}

/**
 * return the reservations' details
 */
const getReservations = async () => {
    return await getFromDB('Select * from reservation')
}

const getRooms = async () => {
    return await getFromDB('select * from room')
}

const getEvents = async () => {
    return await getFromDB('select * from events')
}

const FindingOrderConfirmation = async (orderNumber) => {
    try {
        const data = await pool.query(
            `select v.name , v.email ,v.phone , res.reservationid,
            res.startdate , res.enddate , res.price 
             from visitors v , reservation res , orderconfirmation o
            where o.ordeconfid=${orderNumber} and 
            res.reservationid= o.resvid
             and v.visitorid=o.visid
            `
        )
        return data.rows
    } catch (e) {
        console.log(e)
    }

}

const getSearchFromDB = async (table, columns) => {
    const columnNames = Object.keys(columns);
    const columnValues = Object.values(columns);
    let conditions = '';
    for (let i = 0; i < columnNames.length; i++) {
        if (columnValues[i] === '')
            continue;
        if (i === 0) {
            if (columnNames[i] === 'position' || columnNames === 'bedtype') {
                conditions = conditions.concat(columnNames[i] + ' = ' + `'${columnValues[i]}'`)
            } else {
                conditions = conditions.concat(columnNames[i] + ' = ' + columnValues[i]);
            }
        } else {
            if (columnValues[i - 1] === '') {
                conditions = conditions.concat(columnNames[i] + ' = ' + `'${columnValues[i]}'`)
            } else {
                conditions = conditions.concat(' AND ' + columnNames[i] + ' = ' + `'${columnValues[i]}'`)
            }

        }
    }
    const query = `select * from ${table} where ${conditions}`;
    return await getFromDB(query)
}


const getStats = async () => {

    //aggregate queries
    const empResp = await pool.query(`
    select count(*) as totalEmp, avg(salary)  as avgsalary, max(salary) as maxSalary
    from employees 
    `);

    const resvResp = await pool.query(`
    select count(*) as totalResv, sum(pcount) as GuestCount
    from reservation 
    `);

    // nested aggregate with group by
    const roomResp = await pool.query(`
    SELECT
        r.capacity,
        count(*):: INT capcount
    FROM
        room r,
        reservationroom rr
    WHERE
        r.id = rr.roomnumber
    GROUP BY
        r.capacity
    Order by count(*) desc
    `);

    let stats = {
        empStats: empResp.rows[0],
        resvStats: resvResp.rows[0],
        roomStats: roomResp.rows
    }
    console.log(stats)
    let employeestat=Object.values(stats.empStats);
    let resvstat=Object.values(stats.resvStats);
    let roomstat=Object.values(stats.roomStats);

    if(employeestat.includes(null)||resvstat.includes(null)|| roomstat.includes(null)){
        throw new Error('No data found');
    }
    return stats;
}

//Division for all the rooms that have all the essentials and rooms that don't
const getRoomWithEssentials=async()=>{
    const notNeeded=await pool.query(`
                    SELECT  r.id 
                    FROM room r 
                    WHERE NOT EXISTS ((
                                SELECT
                                    itemid
                                FROM
                                    roomessentials)
                            EXCEPT (
                                SELECT
                                    rrhe.itemid
                                FROM
                                    room rr,
                                    roomhasessentials rrhe
                                WHERE
                                    rr.id = rrhe.roomnumber
                                    AND rr.id = r.id))`)

     const needed=await pool.query(`
        select r.id
        from room r 
        except( SELECT  r.id 
            FROM room r 
            WHERE NOT EXISTS ((
                        SELECT
                            itemid
                        FROM
                            roomessentials)
                    EXCEPT (
                        SELECT
                            rrhe.itemid
                        FROM
                            room rr,
                            roomhasessentials rrhe
                        WHERE
                            rr.id = rrhe.roomnumber
                            AND rr.id = r.id)))
                            
        `)
        let neededEssential=[]
        let notNeededEssential=[]
        for(let room of needed.rows){
            neededEssential.push(room.id)
        }
        for(let room of notNeeded.rows){
            notNeededEssential.push(room.id)
        }
        let obj={req:neededEssential, notreq:notNeededEssential}
    return obj

}
getRoomWithEssentials()

// getStats()

module.exports = {
    FindingAvailableRooms,
    getEmployees,
    getReservations,
    getRooms,
    getEvents,
    FindingOrderConfirmation,
    getEmployeeWithID,
    getSearchFromDB,
    getStats,
    getRoomWithEssentials
}
