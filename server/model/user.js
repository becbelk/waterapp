const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User= Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    previlege:{
        type:String,
        default:'Agent',
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    lastLoggin:{
        type:Date,
        default:Date.now(),
    },

});
module.exports=mongoose.model('User',User);
