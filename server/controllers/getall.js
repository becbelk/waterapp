
const Consumer = require('../model/consumer.js');
const context=require('../router/context.js');

exports.getall=async (req,res)=>{
let list = await Consumer.find();
res.json({list:list, context: context.context});
}
