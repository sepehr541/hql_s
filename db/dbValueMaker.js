const moment = require('moment');

const makeRoomValues = (id, cap, bedtype) => {
    return `(${id}, ${cap}, ${bedtype})`
}


module.exports=makeRoomValues