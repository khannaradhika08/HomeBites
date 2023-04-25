const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username:{
        type :String
    },
    restname:{
        type :String
    },
    item:{
        type :String
    },
    price:{
        type :Number
    },
    quantity:{
        type :Number
    }

},{timestamps:true});

const cart = mongoose.model('cart',cartSchema);

module.exports = cart;