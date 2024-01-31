const Consumer = require('../../../model/consumer');
exports.deleteOne = async (req, res) => {
    try {
        let no = req.body.no;
        console.log('no=', no);
        //todo: initialization:  let result = await Consumer.updateMany({no:{$gt:"00000"}},{$set:{deleted:false}})
        let result = await Consumer.updateMany(
            {no:no},
            { $set: { deleted: true } },
        )

        res.send(result)//todo send result
    } catch (e) {
        console.log(e);
    }
}