const Product = require("../model/productModel")


exports.createProduct = async (req,res) =>{


    console.log(req.file)
    const filename =req.file;
    let filepath
    if(!filename){
        console.log("please add file")
        return
    }else{
        filepath=filename
    }
    
const {productName,productDescription,productStockQty, productPrice, productStatus}=req.body
console.log(req.body)


if(!productName || !productDescription || !productStockQty || !productPrice || !productStatus){
    return res.status(400).json({
        message:"please provide productName,productDescription,productStockQty, productPrice, productStatus "
    })
}

  const productCreate = await Product.create({
         productName,
         productDescription,
         productStockQty,
         productPrice,
         productStatus
  });
    res.status(201).json({
        message:"product create successfully",
        data:productCreate

    })
}
