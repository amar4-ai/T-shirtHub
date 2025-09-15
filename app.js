const express = require("express");

const { database } = require("./database/dbconnect");
const authRouter = require("./routes/authRoute")

require("dotenv").config()

const app = express();

app.use(express.json())

database(process.env.MONGO_URI)
// http://localhost:3000/api/auth/register

app.use("/api/auth/",authRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running at 3000 port")

})