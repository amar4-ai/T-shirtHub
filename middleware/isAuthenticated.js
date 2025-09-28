const {promisify} = require("util")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")



const isAuthenticated =  async(req,res, next)=>{
    console.log("He is authenticated");
    const token =req.headers.authorization
    console.log(token)
    if(!token){
        return  res.status(403).json({
            message:"please login"
        })
    }
    const decode  = await promisify(jwt.verify)(token,"fnsdlnfls")
    console.log(decode)
    const doesUserExist = await User.findOne({_id:decode.id})
    console.log(doesUserExist)

    if(!doesUserExist){

        return res.status(404).json({
            message:"user does not exists with that token"
        })
    }
    req.user = doesUserExist


    next()
}

module.exports=isAuthenticated;