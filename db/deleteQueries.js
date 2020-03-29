const {pool} = require("./dbConnect")
const { defaultCallback, Reservation, Reservation_Room, Room, Employees } = require('./dbConstants');


var drop_All_tables=()=>{
    pool.query(" drop table  Parking , Room , Visitor , Employee , Recreational , Food , Restaurant , Customer_Service , RoomEssentials",(error, res)=>{
        if (error) return console.log(error);
    
    })
}

//drop_All_tables();

/**
 * drops a given table from db
 * @param {String} table table's name or imported const from dbConstants 
 */
const dropTable = async (table) => {
    pool.query(`DROP TABLE ${table.split("(", 1)}`, defaultCallback)
}

const deleteRowWithID = async (table, idcolumn, id) => {
    try {
        await pool.query(`DELETE FROM ${table} WHERE ${idcolumn} = ${id}`);
    } catch (error) {
       throw error; 
    }
}

const deleteEmployee = async (id) => {
    await deleteRowWithID('employees', 'employeeID', id);
}


const deleteResv = async (id) => {
    await deleteRowWithID('Reservation', 'reservationID', id);
}

const deleteEvent = async (id) => {
    await deleteRowWithID('events', 'eventid', id);
}

const deleteRoom = async (id) => {
    await deleteRowWithID('room', 'id', id);
}
module.exports = {
    deleteEmployee,
    deleteResv,
    deleteEvent,
    deleteRoom
}