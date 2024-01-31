const Counter = require('../../model/counter');
exports.getNo=async (req,res)=>{
try{
    const counter=await Counter.find({})
    res.send({no:counter[0].value})

}catch(error){
    console.log(error)
}
}