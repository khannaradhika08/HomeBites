const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restname:{
        type :String
    },
    item:{
        type :String
    },
    detail:{
        type :String
    },
    price:{
        type :Number
    }

},{timestamps:true});

const menu = mongoose.model('menu',menuSchema);

module.exports = menu;