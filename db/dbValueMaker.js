const moment = require('moment');

const makeRoomValues = (id, cap, bedtype) => {
    return `(${id}, ${cap}, '${bedtype}')`
}

const makeReservValues=(id,start,end,price,pcount)=>{
    return `(${id}, '${start}','${end}',${price},${pcount})`
}

const makeResev_Roomvalues=(room_id,resv_id)=>{
    return `(${room_id},${resv_id})`
}

module.exports={
    makeRoomValues,
    makeReservValues,
    makeResev_Roomvalues
}