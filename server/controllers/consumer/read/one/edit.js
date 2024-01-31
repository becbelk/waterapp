const search = require('../../search');
const stringOp = require('../../../../misc/string_op');
const Consumer = require('../../../../model/consumer');
const global = require('../../../../misc/global');
const mongoose = require('mongoose');
/**
 *  GET paginated view
 * @param {page} req 
 * @param {consumers,count, pages,hasNextPage, nextPage,hasPreviousPage, previousPage} res 
 */

exports.editList = async (req, res) => {
    try {

        let page = req.query.page || 1;
        const title = 'تسيير استهلاك المياه';
        let searchTerm = (req.body.searchTerm != null) ?
            req.body.searchTerm : decodeURIComponent(req.cookies.searchTerm);
        let queryObject = {
                searchTerm,
                page,
                isSaved: false,
                sort: 'no+1'
            }
    


        let datas = {
            consumers, count, pages,
            hasNextPage, nextPage,
            hasPreviousPage, previousPage
        } = await search.find(queryObject)

        datas.title = title;
        res.cookie('page', page)
        res.cookie('nextPage', nextPage)
        res.cookie('previousPage', previousPage)
        res.cookie('hasNextPage', hasNextPage)
        res.cookie('hasPreviousPage', hasPreviousPage)

        res.render('consumer/update/edit_list',
            datas);
    } catch (e) {
        console.log(e);
    }
}

/**
 * GET
 * @param {id} req 
 * @param { consumer, title } res 
 */

exports.editFormForConsumer = async (req, res) => {
    //todo edited by user belkacem

    const title = 'تسيير استهلاك المياه-تعديل بيانات المستهلك';
    console.log("global.context.periode=", global.context.periode)
    let id = new mongoose.Types.ObjectId(req.params.id);
    console.log("id=", id)

    let consumer = await Consumer.aggregate([
        { $unwind: "$consumptions" },
        {
            $match: {
                _id: id,
                "consumptions.periode": global.context.periode
            }
        },//$match
        {
            $project: {
                no: 1,
                name: 1,
                address: 1,
                watermeterId: 1,
                oldConsumption: "$consumptions.oldConsumption",
                newConsumption: "$consumptions.newConsumption",
                isFlatRated: "$consumptions.isFlatRated",
            }
        },
    ]);

    consumer = consumer[0];
    res.render('update/one/consumer', { consumer, title });
}

/**
 * 
 * @param {n-m} req 
 * @param {consumers,count, pages,hasNextPage, nextPage,hasPreviousPage, previousPage} res 
 */

exports.search = async (req, res) => {
    try {

        let page = req.query.page || 1;
        const title = 'تسيير استهلاك المياه';
        let searchTerm = req.body.searchNumber;
        let queryObject = {
            searchTerm,
            page,
            isSaved: false,
            sort: 'no+1',
        }


        const datas =await search.find(queryObject)
        datas.title = title;

        console.log('consumers=', datas.consumers)
        if (datas.consumers) { res.render('consumer/update/edit_list', datas); }
        else {
            console.log("case not found ")
            res.render('errors/not_found');
        }
    } catch (e) {
        console.log(e);
    }
}






