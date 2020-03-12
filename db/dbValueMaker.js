const moment = require('moment');

const makeRoomValues = (id, cap, bedtype) => {
    return `(${id}, ${cap}, '${bedtype}')`
}

const makeReservValues=(id,start,end,price,pcount)=>{
    return `(${id}, ${start},${end},${price},${pcount})`
}

module.exports={
    makeRoomValues,
    makeReservValues}