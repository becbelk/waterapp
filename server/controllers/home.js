exports.home=(req,res)=>{
    let title='waterApp'
    res.render('index',{title,count:null,areSaved:null,pages:0})
}