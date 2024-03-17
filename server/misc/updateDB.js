const Consumer=require('../model/consumer')
exports.update=async(periode)=>{
let result = await Consumer.updateMany({},{$set:{'consumptions.0.isTaxed':true}});//,false,true
console.log('result=', result)
}