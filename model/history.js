const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
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
    },
    delivered:{
        type :String
    }

},{timestamps:true});

const history = mongoose.model('history',historySchema);

module.exports = history;