const search = require('../search');
//const Consumer = require('../model/consumer');
/**
 * GET table
 */

exports.show = async (req, res) => {

    try {
        let page = req.query.page || 1;
    let isSaved=(req.body.isSaved)??=true

        const title = 'تسيير استهلاك المياه';
        let searchTerm = (req.body.searchTerm != null) ?
            req.body.searchTerm : decodeURIComponent(req.cookies.searchTerm);
        const datas = { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
            = await search.find({ searchTerm, page, isSaved: isSaved, sort: 'no+1' });
        datas.title = title;
        res.render('consumer/read/table',
            datas
        );
    } catch (e) {
        console.log(e)
    }

};



exports.reset = async (req, res) => {
    try{
    let page = 1;

    const title = 'تسيير استهلاك المياه';
    let searchTerm = "";
    let isSaved=false
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



