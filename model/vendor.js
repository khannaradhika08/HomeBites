const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    restname:{
        type :String,
        unique :true
    },
    password:{
        type:String,
        require: true
    }
},{timestamps:true});

const vendor = mongoose.model('vendor',vendorSchema);

module.exports = vendor;