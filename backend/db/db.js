const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB is Connected.")
    })
    
}

module.exports = connectDB