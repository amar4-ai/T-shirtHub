const restrictTo =(...roles)=>{
    return (req,res,next)=>{
        // console.log(roles)

        const userRole  = req.user.roles
        if(!roles.includes(userRole)){
            res.status(403).json({
                message:"you have not access to create product"
            })
        }
        else{
            next()
        }
    }

}

module.exports = restrictTo