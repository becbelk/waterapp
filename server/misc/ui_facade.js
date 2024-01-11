const calc = require('./calculator')
exports.update = (toUpdate, newValue, userUpdator) => {
    console.log(`[*] {updateFromUI}`);
    console.log('[*] Updating :', JSON.stringify(toUpdate), 'with values from UI:', JSON.stringify(newValue));//console.log()
    const log = { user: userUpdator, time: Date.now() };
    toUpdate.name = newValue.name;
    toUpdate.address = newValue.address;
    //    console.log(' find index of periode : toUpdate.consumptions=',toUpdate.consumptions,'newValue.periode=',newValue.periode)
    cs = toUpdate.consumptions;
    pr = newValue.periode;
    let index = calc.findIndex(cs, pr);
    //console.log('index=', index)


    // toUpdate.consumptions[index].copyWithin({
    //     isFlatRated:Boolean(newValue.isFlatRated),
    //     oldConsumption:Number(newValue.oldConsumption),
    //     newConsumption:Number(newValue.newConsumption)
    // })=Boolean(newValue.isFlatRated);//todo:----
    toUpdate.consumptions[index].isFlatRated = Boolean(newValue.isFlatRated);//todo:----
    toUpdate.consumptions[index].oldConsumption = Number(newValue.oldConsumption);
    toUpdate.consumptions[index].newConsumption = Number(newValue.newConsumption);
    toUpdate.redactions.push(log);
    toUpdate.saved =true

    // if (toUpdate.redactions === 'undefined'||toUpdate.redaction===null) {
    //      toUpdate.redactions = [log] 
    //     }else {
    //      toUpdate.redactions.push(log);
    //  }
    // connsole.log()
    console.log('[*] {updateFromUI} [toUpdate] =[', toUpdate, '].');

    return toUpdate
}
