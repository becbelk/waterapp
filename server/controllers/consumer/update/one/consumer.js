const Consumer = require('../../../../model/consumer');

const global = require('../../../../misc/global')

/**
 * POST
 * @param {whole object no ...} req 
 * @param {*} res 
 */

exports.one = async (req, res) => {
    try {
        let user = global.context.username;

        const _consumer = req.body;// name address old new isflatrated
        console.log('_consumer=', _consumer)
        const result = await updateConsumer({ consumer: _consumer, user: user });
        console.log('[*] Saving consumer Result report:', result);

    } catch (error) {
        console.log('[*] Error while saving row', error);
    }
}

const updateConsumer = async ({ consumer, id, user }) => {

    return await Consumer.updateOne(
        { no: consumer.no, "consumptions.periode": global.context.periode },
        {
            $set: {
                name: consumer.name,
                address: consumer.address,// لا يمكن لمستعمل هذا [السبيل] من تغيير رقم العداد
                watermeterId: consumer.watermeterId,// لا يمكن لمستعمل هذا [السبيل] من تغيير رقم العداد
                saved: true,
                "consumptions.$.oldConsumption": consumer.oldConsumption,
                "consumptions.$.newConsumption": consumer.newConsumption,
                "consumptions.$.isFlatRated": consumer.isFlatRated,
                "consumptions.$.isTaxed": consumer.isTaxed,
            },
            $push: {
                redactions: {
                    $currentDate: { time: true },
                    user: user,
                }
            }
        })
}
