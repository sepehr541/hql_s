const {pool} = require("./dbInit")


var drop_All_tables=()=>{
    pool.query(" drop table  Parking , Room , Visitor , Employee , Recreational , Food , Restaurant , Customer_Service , RoomEssentials",(error, res)=>{
        if (error) return console.log(error);
    
    })
}

drop_All_tables()

