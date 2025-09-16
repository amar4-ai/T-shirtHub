const { registerUser, loginUser, forgotPassword, verifyotp } = require("../controller/authController")



const router = require("express").Router()

//
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/forgotpassword").post(forgotPassword)
router.route("/verifyotp").post(verifyotp)
module.exports= router