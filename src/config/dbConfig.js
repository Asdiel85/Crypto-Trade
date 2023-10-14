const mongoose = require('mongoose');
const {MONGO_URI} = require('./constants.js')

async function dbConnect() {
    mongoose.connect(MONGO_URI)
}

module.exports = dbConnect