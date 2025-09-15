const mongoose = require("mongoose")
exports.database =(URI)=>{
    mongoose.connect(URI)
    console.log("database is connect successfully")
}