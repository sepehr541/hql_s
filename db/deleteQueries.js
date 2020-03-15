const {pool} = require("./dbConnect")
const { defaultCallback } = require('./dbConstants');


var drop_All_tables=()=>{
    pool.query(" drop table  Parking , Room , Visitor , Employee , Recreational , Food , Restaurant , Customer_Service , RoomEssentials",(error, res)=>{
        if (error) return console.log(error);
    
    })
}

// drop_All_tables()

/**
 * drops a given table from db
 * @param {String} table table's name or imported const from dbConstants 
 */
const dropTable = async (table) => {
    pool.query(`drop table ${table.split("(", 1)}`, defaultCallback)
}
