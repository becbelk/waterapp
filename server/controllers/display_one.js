const search = require('./search.js');

exports.showConsumerDetails = async (req, res) => {
    const title = 'تسيير استهلاك المياه- بيانات المستهلك';

    let id = req.params.id;
  consumer=await  search.findOne(id)
    res.render('pages/consumer', { consumer, title,});
}
