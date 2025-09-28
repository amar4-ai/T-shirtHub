const express = require("express");

const { database } = require("./database/dbconnect");
const productRoute = require("./routes/productRoute")
const authRoute = require("./routes/authRoute")

require("dotenv").config()

const app = express();

app.use(express.json())
app.use(express.urlencoded())

database(process.env.MONGO_URI)
// http://localhost:3000/api/auth/register
app.use("/api/auth/",authRoute)

app.use("/api/admin/product/",productRoute)

app.listen(process.env.PORT, () => {
    console.log("server is running at 3000 port")

})