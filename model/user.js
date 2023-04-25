const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname:{
        type :String,
        require: true
    },
    lname:{
        type :String,
        require: true
    },
    address:{
        type :String,
        require: true
    },
    email:{
        type :String,
        require: true
    },
    phone:{
        type :String,
        require: true
    },
    username:{
        type :String,
        unique :true
    },
    password:{
        type:String,
        require: true
    }
},{timestamps:true});

const user = mongoose.model('user',userSchema);

module.exports = user;