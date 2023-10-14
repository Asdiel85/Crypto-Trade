const { MongooseError } = require("mongoose");

exports.extractErrorMessages = (error) => {


    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(x => x.message)[0];
    } else if (error) {
        return [error.message][0];
    }
}