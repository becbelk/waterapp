const Consumer = require('../../../model/consumer');
const Counter = require('../../../model/counter');
const global = require('../../../misc/global');
const { formatNo } = require('../../../misc/string_op');
const { autoIncrement } = require('../../counter/update');

/** POST */
exports.newConsumer = async (req, res) => {
    try {
        console.log('[*]-> [saveNewConsumer]');

        req.body.no = await autoIncrement();
        console.log('req.body.no=', req.body.no);
        if (req.body.no != "-1") {

            console.log('[*]-> [creating] ',req.body.no);
            const consumer = await Consumer.create(uiAdapter(req.body, global.context));
            console.log('[*]-> [created]');

        }
        else {
            console.log('internal error cant save element no=-1')

        }

        res.redirect('/home');

    } catch (error) {
        console.log('internal error cant save element no=-1', error)
    }
}

const uiAdapter = (body, context) => {
    console.log('body.no=', body.no);
    const temp = {
        no: formatNo(Number(body.no)),
        name: body.name,
        address: body.address,
        watermeterId: body.watermeterId,
        consumptions: [{
            periode: context.periode,
            oldConsumption: 0,
            newConsumption: 0,
            invoice: [{ levelConsumption: 0, levelValue: 0 }],// فاتورة
            payed: 0,
            canceledBy: '-',
            isFlatRated: false //جزافي

        }],
        redactions: [{ user: context.username, time: Date.now() }],
    }
    console.log('temp=', temp);
    return temp;
}

