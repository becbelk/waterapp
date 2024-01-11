const Consumer = require('../../model/consumer');
const context = require('../../misc/context');

/** POST */
exports.saveNewConsumer = async (req, res) => {
console.log('context=',context);
    console.log('[*]->[saveNewConsumer]');
    const title = 'تسيير استهلاك المياه-ادراج مستهلك جديد';

  //  console.log(uiAdapter(req.body));

    const consumer = await Consumer.create(uiAdapter(req.body,context.context));

    res.redirect('/');
}
/** GET */
exports.newConsumerForm = async (req, res) => {
    res.render('create/new_consumer', { title: "new" });
}
const uiAdapter = (body,context) => {
const temp= {
        no:body.no,
        name: body.name,
        address: body.address,
        watermeterId: body.watermeterId,
        consumptions: [{
            periode: context.periode,
            oldConsumption: 0 ,
            newConsumption: 0,
            invoice: [  {levelConsumption: 0, levelValue:0}],// فاتورة
            payed:0,
            canceledBy:'-' ,
            isFlatRated: false //جزافي

        }],
        redactions: [{ user: context.username, time: Date.now() }],
    }
    console.log('temp=',temp);
    return temp;
}