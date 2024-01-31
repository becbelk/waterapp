const Counter = require('../../model/counter');
const Consumer = require('../../model/consumer');

exports.autoIncrement = async () => {
    try {
        let no = -1;
        let counter = await Counter.find({})
        if (counter.length == 0) {
            console.log('----counter empty   -------------------')
            let result = await Counter.insertMany([{ key: 'autoInc', value: -1, isCoherent: false }])
        }
        if (counter[0].isCoherent == true) {
            console.log('----coherent just increment   -------------------')
            let updateResult = await Counter.updateOne({}, { $inc: { value: 1 } })
            no = counter[0].value+1;
        console.log('updateResult.no=', no);

        } else {
            console.log('not coherent.......aggregate')
            let _max = await Consumer.aggregate([{ $group: { _id: null, value: { $max: "$no" } } }]);
            no = Number(_max[0].value) + 1;
            console.log('aggregate....', _max, 'no========', no)
            let updateResult = await Counter.updateOne({}, { $set: { value: no, isCoherent: true } })
            console.log('updateResult', updateResult)
        }
        console.log('no========', no)
        return no
    } catch (error) {
        console.log('[*]. Fail to generate an autoinc number no,', error);
        await Counter.updateOne({}, { $set: { value: -1, isCoherent: false } })

        return -1
    }

}