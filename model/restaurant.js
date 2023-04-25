const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restSchema = new Schema({
    restname:{
        type :String
    },
    restaddress:{
        type :String
    },
    restcity:{
        type :String
    }
},{timestamps:true});

const restaurant = mongoose.model('restaurant',restSchema);

module.exports = restaurant;