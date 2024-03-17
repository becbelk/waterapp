const updater= require('../misc/updateDB')
const context=require('../misc/global')
exports.home=(req,res)=>{
    console.log('[home]')
    let title='waterApp'
//updater.update(context.periode); //todo: in insertion
    res.render('index',{title,count:null,areSaved:null,pages:-1})
}