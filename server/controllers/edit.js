const search = require('./search.js');
const stringOp = require('../misc/string_op.js');
const Consumer = require('../model/consumer.js');
const calc = require('../misc/calculator');
const ctx = require('../router/context');
/** Get  */

exports.editList = async (req, res) => {
    try {

        const perPage = 10;
        let page = req.query.page || 1;
        const title = 'تسيير استهلاك المياه';
        let searchTerm = (req.body.searchTerm != null) ?
            req.body.searchTerm : decodeURIComponent(req.cookies.searchTerm);
        let datas = {
            consumers, count, pages,
            hasNextPage, nextPage,
            hasPreviousPage, previousPage
        } = await search.find(searchTerm, page, false,'no+1')

        datas.title = title;
        res.cookie('page', page)
        res.cookie('nextPage', nextPage)
        res.cookie('previousPage', previousPage)
        res.cookie('hasNextPage', hasNextPage)
        res.cookie('hasPreviousPage', hasPreviousPage)

        res.render('update/edit_list',
            datas);
    } catch (e) {
        console.log(e);
    }
}


exports.editFormForConsumer = async (req, res) => {
    //todo edited by user belkacem

    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    let id = req.params.id;
    let data = await Consumer.findById(id);
    let consumer={
        _id:data._id,
        name:data.name,
        address:data.address,
        watermeterId:data.watermeterId
    }
    let index=calc.findIndex(data.consumptions,ctx.context.periode)
    console.log('index=',index,'')
    let consumption=data.consumptions[index]
    res.render('update/consumer_form', { consumer,consumption, id, title });
}



exports.searchByNo = async (req, res) => {
    try {

        const perPage = 10;
        let page= req.query.page || 1;
        const title = 'تسيير استهلاك المياه';
        let searchTerm = req.body.searchNumber;
        searchNumbers = searchTerm.split('-');
      let interval= searchNumbers.map(no => stringOp.formatNo(no));
        console.log('searchNumbers=', interval,'interval.Length=',interval.length);
  
        const datas =interval.length==1? await search.findSingleNo(interval[0],false)
        : interval.length==2? await search.findBetweenNo(interval,page,false):[]
        datas.title= title;

        console.log('consumers=', datas.consumers)
        if (datas.consumers != undefined) { res.render('update/edit_list', datas); }
        else {
            res.render('errors/not_found');
        }
    } catch (e) {
        console.log(e);
    }
}