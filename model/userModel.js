const mongoose = require("mongoose")
 const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        require:[true,"userName is required"]
    },
    userEmail:{
        type:String,
        require:[true, "userEmail is required"],
        lowercase:true,
        unique:true,
    },
    userNumber:{
        type:String,
        require:[true,"userNUmber is required"],
        minlength:10
    },
    userPassword:{
        type:String,
        require:[true,"user password is require"]
    },
    role:{
        type:String,
        enum:["customer","admin"],
    default:"customer"
    }
 },{
    timestamps:true
 })

 const User = mongoose.model("User", userSchema)
 module.exports=User