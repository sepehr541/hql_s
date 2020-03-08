const {pool}=require("./dbConnect")



var inserting=(name)=>{
    pool.query("insert into room (")
}
