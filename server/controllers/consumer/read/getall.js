
const Consumer = require('../../../model/consumer');
const context=require('../../../misc/global');

exports.getall=async (req,res)=>{
let list = await Consumer.find();
res.json({list:list, context: context.context});
}
