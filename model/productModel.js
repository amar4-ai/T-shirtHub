const mongoose = require("mongoose")
 const productSchema = new mongoose.Schema({
    
        productName:{
            type:String,
            required:[true, "productName must be provided"]
        },
        productDescription:{
            type:String,
            required:[true,"productDescription must be provide"]
        },
        productStockQty:{
            type:Number,
            required:[true,"productStockQty must be provide"]
        },
        productPrice:{
            type:Number,
            required:[true,"productPrice must be provide"]
        },
        productStatus:{
            type:String,
            enum:["available", "unavailable"]
        },
        productImage:String
 },{
    timestamps:true
 })

 const Product = mongoose.model("Product", productSchema)
 module.exports=Product