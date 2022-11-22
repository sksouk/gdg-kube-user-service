const config = require('..');
const mongoose = require("mongoose");

const connectMongoDB = () => {
    try {
        return mongoose.connect(config.mongodb.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    } catch (error) {
        console.log("error: ", error)
        return config.statusMessage.CONNECTION_ERROR
    }
}

module.exports = { connectMongoDB }