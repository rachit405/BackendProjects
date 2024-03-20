const mongoose = require("mongoose");

async function connectToMongoDB(connectString) {
    return mongoose.connect(connectString);
}

module.exports = {
    connectToMongoDB,
}