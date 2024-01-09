const Consumer = require('../model/consumer.js');
exports.deleteOne = async (req, res) => {
    try {
        let id = req.params.id;
        console.log('_id=', id);
        let result = await Consumer.deleteOne({ _id: id })
        console.log('_id=', id,'was deleted!');

        res.redirect('/list')
    } catch (e) {
        console.log(e);
    }
}