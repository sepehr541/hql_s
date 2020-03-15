const moment = require('moment');
/**
 * 
 * @param {Integer} id 
 * @param {Integer} cap 
 * @param {String} bedtype 
 */
const makeRoomValues = (id, cap, bedtype) => {
    return `(${id}, ${cap}, '${bedtype}')`
}

/**
 * 
 * @param {Integer} id 
 * @param {String} start 'YYYY-MM-DD'
 * @param {String} end 'YYYY-MM-DD'
 * @param {Integer} price 
 * @param {Integer} pcount 
 */
const makeReservValues=(id,start,end,price,pcount)=>{
    return `(${id}, '${start.format('YYYY-MM-DD')}', '${end.format('YYYY-MM-DD')}', ${price}, ${pcount})`
}

/**
 * 
 * @param {Integer} resv_id Reservation ID
 * @param {Integer} room_id Room Number
 */
const makeResev_RoomValues=(resv_id, room_id)=>{
    return `(${resv_id}, ${room_id})`;
}

module.exports={
    makeRoomValues,
    makeReservValues,
    makeResev_RoomValues
}