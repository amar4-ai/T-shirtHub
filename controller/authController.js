const User = require("../model/userModel")

const bcrypt = require("bcryptjs")
const sendEmail = require("../service/sendEmail")



exports.registerUser = async (req, res) => {
    // console.log("hello")
    // console.log(req.body);
    // const userName = req.body.userName
    // const userEmail = req.body.userEmail
    // const userNUmber = req.body.userNumber
    // const userPassword = req.body.userPassword
    // console.log(userName, userEmail, userNumber, userPassword)
    //distructure
    const { username, Email, Number, Password } = req.body
    if (!username || !Email || !Number || !Password) {
        return res.status(400).json({
            message: "please provide userName, userEmail, userNumber, userPassword"
        })
    }
    // check if that email already exist or not.
    const userFound = await User.find({ userEmail: Email })
    if (userFound.length > 0) {
        return res.status(400).json({
            message: "user with that email already registered",
            data: []
        })
    }

    const userData = await User.create({
        userName: username,
        userEmail: Email,
        userNumber: Number,
        userPassword: bcrypt.hashSync(Password, 8)
    })

    res.status(201).json({
        message: "registration successfully",
        data: userData
    })


}


exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body
    console.log(Email, Password)

    if (!Email || !Password) {
        return res.status(400).json({
            message: "Email, password must be providde"
        })
    }
    const userFound = await User.find({ userEmail: Email })
    if (userFound.length == 0) {
        return res.status(400).json({
            message: "this email is not register"
        })
    }


    const isMatched = bcrypt.compareSync(Password, userFound[0].userPassword)

    if (isMatched) {
        res.status(200).json({
            message: "user logged in successfully",
            data: userFound
        })
    } else {
        res.status(400).json({
            message: "Invalid paswword"
        })
    }


}

exports.forgotPassword = async (req, res) => {
    const { Email } = req.body
    console.log("hello")
    if (!Email) {
        return res.status(400).json({
            message: "Please provide email"
        })
    }


    const userExist = await User.find({ userEmail: Email })
    if (userExist.length === 0) {
        return res.status(400).json({
            message: "User email is not register"
        })
    }

    const otp = Math.floor(1000 + Math.random() * 9000)

    console.log(otp)


    userExist[0].otp = otp
     await userExist[0].save()

    await sendEmail({
        Email: Email,
        subject: "verifiaction otp",
        message: "your otp is" + otp
    })
    res.status(200).json({
        message: "otp send successfully",

    })


}
exports.verifyotp = async (req, res) => {
    const { Email, otp } = req.body

    if (!Email || !otp) {
        return res.status(400).json({
            message: "email and otp must be provide"
        })
    }
    const userExists = await User.find({ userEmail: Email }).select("+otp +isOtpVerified")

    // console.log(userExist)
    if (userExists.length === 0) {
        return res.status(400).json({
            message: "email is not register"
        })
    }
    if (userExists[0].otp !== otp) {
        return res.status(400).json({
            message: "Invalid otp"
        })
    } else {
        userExists[0].otp = undefined,
            userExists[0].isOtpVerified = true,
            await userExists[0].save()

        res.status(200).json({
            message: "otp is verify"
        })
    }
}