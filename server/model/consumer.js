const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = Schema({
    levelConsumption: { type: Number, default: 0 },
    levelValue: { type: Number, default: 0 }
});


const consumptionSchema = Schema({
    periode: { type: String, required: true },
    oldConsumption: { type: Number, default: 0 },
    newConsumption: { type: Number, default: 0 },
    invoice: [levelSchema],// فاتورة
    payed: { type: Number, default: 0 ,get:(value)=>{return value.toFixed(2)} },
    canceledBy: { type: String, default: '-' },
    saved:{type:Boolean,default:false},
    isFlatRated:{type:Boolean, default:false}//جزافي
},
);

const redactionSchema = Schema({
    user: { type: String, required: true },
    time: { type: Date, default: Date.now() }
});

const consumerSchema = Schema({
    no: { type: String, unique: true },
    name: { type: String, required: true ,index:true},
    address: { type: String, required: true , index:true},
    watermeterId:  { type: String, defaut:'//', },// رقم العداد
    consumptions: [consumptionSchema],// قائمة الاستهلاكات حسب الفترات
    redactions: [redactionSchema],//todo: memento pattern
    deleted:{type:Boolean,default:false},
    saved:{type:Boolean,default:false},
    hash: { type: String, default: '0' },//todo: use bcrypt
});

consumerSchema.index({name:'text',address:'text'});




const Consumer = mongoose.model('Consumer', consumerSchema);


module.exports = Consumer;