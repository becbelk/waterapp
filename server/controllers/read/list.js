const search = require('../search');
//const Consumer = require('../model/consumer');
/**
 * GET table
 */

exports.show = async (req, res) => {

    try {
        let page = req.query.page || 1;
        let isSaved = (req.query.isSaved=='saved')?true:false;
        console.log('isSaved')
        console.log('query ==============',req.query);
        const title = 'تسيير استهلاك المياه';
        let searchTerm = (req.query.searchTerm != null) ?
            req.query.searchTerm : decodeURIComponent(req.cookies.searchTerm);
        //= { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
        const datas = await search.find({ searchTerm, page, isSaved: isSaved, sort: 'no+1' });

        datas.title = title;
        res.render('consumer/read/table',
            datas
        );
    } catch (e) {
        console.log(e)
    }

};



exports.reset = async (req, res) => {
    try {
        let page = 1;

        const title = 'تسيير استهلاك المياه';
        let searchTerm = "";
        let isSaved = false
        datas = { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
            = await search.find({ searchTerm, page, isSaved: isSaved, sort: 'no+1' });

        datas.title = title;
        res.render('consumer/read/table',
            datas
        );
    } catch (e) {
        console.log(e)
    }
}



