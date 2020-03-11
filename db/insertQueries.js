const { pool } = require('./dbConnect');




var Adding_room=(table,data)=>{
        pool.query(`insert into ${table} values($1,$2,$3)`,data,(err,res)=>{
            if(err)return console.log(err);
            console.log(res);
        
             
    })
   Adding_room('room')
        
        
    
   
    
}

Adding_table("room",[11,12,'nigger'])

