const Consumer = require('../../model/consumer');
const uiFacade = require('../../misc/ui_facade')
const ctx = require('../../misc/context')


exports.saveRow = async (req, res) => {
    try {
        let byUser = ctx.context.username;
        const elem = req.body;// name address old new isflatrated

        const result = await Consumer.updateOne(
            { no: elem.no, "consumptions.periode": ctx.context.periode },//شرط البحث
            {
                $set: {
                    name: elem.name,
                    address: elem.address,// لا يمكن لمستعمل هذا [السبيل] من تغيير رقم العداد
                    watermeterId: elem.watermeterId,// لا يمكن لمستعمل هذا [السبيل] من تغيير رقم العداد
                    saved:true,
                    "consumptions.$.oldConsumption": elem.oldConsumption,
                    "consumptions.$.newConsumption": elem.newConsumption,
                    "consumptions.$.isFlatRated": elem.isFlatRated
                },
                $push:{redactions:{
                    $currentDate:{time:true},
                    user:byUser,
                }}
            });
        console.log('[*] Saving element Result report:', result);

    } catch (error) {
        console.log('[*] Error while saving row', error);
    }
}

exports.editAndSaveConsumer = async (req, res) => {
    
    try {
        let byUser = ctx.context.username;

        console.log('post-edit ====> ')
        const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
        const id = req.params.id;
        //belkacem
        //todo edited by :USER:
        user = 'belkacem';
        console.log('body=', JSON.stringify(req.body));
        // const consumerFromUI = req.body;
        //await Consumer.updateOne({ _id: id }, { $set: consumerFromUI }, {})
        //**** */
        let result = await Consumer.updateOne({ _id: id, "consumptions.periode": ctx.context.periode },
            {
                $set: {
                    name: req.body.name,
                    address: req.body.address,
                    watermeterId:req.body.watermeterId,
                    "consumptions.$.oldConsumption": req.body.oldConsumption,
                    "consumptions.$.newConsumption": req.body.newConsumption
                },
                $push:{redactions:{
                    $currentDate:{time:true},
                    user:byUser,
                }}

            })
        const url = '/consumer/' + id;
        res.redirect(url)
    } catch (error) {
        console.log(error)
    }
}
