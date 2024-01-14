const Consumer = require('../../model/consumer');
exports.deleteOne = async (req, res) => {
    try {
        let no = req.body.no;
        console.log('no=', no);
        let result = await Consumer.deleteOne({ no: no })
        console.log('_id=', id,'was deleted!');

        res.redirect('/list')
    } catch (e) {
        console.log(e);
    }
}