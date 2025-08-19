require("dotenv").config()
const app = require("./app")
const connectDB = require("./db/db")
const authRoutes = require("./routes/auth.routes")

connectDB()

app.use("/api/auth", authRoutes)


app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})