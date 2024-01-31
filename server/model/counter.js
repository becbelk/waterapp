const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter=Schema({
    key:{type:String,default:'autoInc',unique:true},
    value:{type:Number,required:true},
    isCoherent:{type:Boolean,default:true}
})

module.exports=mongoose.model('Counter',Counter);
