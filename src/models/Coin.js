const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'The Name should be at least two characters!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^(http|https):\/\//, 'Invalid image url!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [1, 'The Price should be a positive number!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'The Description should be a minimum of 10 characters long!']
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'The Payment Method must be one of the options: crypto-wallet, credit-card, debit-card, paypal'
        },
        required: [true, 'Payment method is required!']
    },
    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin