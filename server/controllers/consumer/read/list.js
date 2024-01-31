const search = require('../search');
//const Consumer = require('../model/consumer');
/**
 * GET table
 */


exports.show=(req,res)=>{
    //build query
    console.log( 'req.query ==',req.query)
    let searchTerm=(req.query.searchTerm!=undefined &&req.query.searchTerm!=null)? req.query.searchTerm:"";
    let page=req.query.page|| 1;
   let string='?searchTerm='+searchTerm+'&isSaved='+req.query.isSaved+'&page='+page;
    if(req.query.isSaved==='saved')
    res.redirect('edited'+string);
else res.redirect('unedited'+string);
}








exports.edited = async (req, res) => {

    try {
        let page = req.query.page || 1;
        console.log('isSaved')
        console.log('query ==============',req.query);
        const title = 'تسيير استهلاك المياه';
        let searchTerm = req.query.searchTerm ;
        //= { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
        let passedQuery='/edited?'+(searchTerm!=undefined && searchTerm!=null? 'isSaved=saved&searchTerm='+searchTerm:'');
        const datas = await search.find({ searchTerm, page, isSaved: true, sort: 'no+1' });

        datas.title = title;
        res.render('consumer/read/table',
           { ...datas, passedQuery}
        );
    } catch (e) {
        console.log(e)
    }

};
exports.unedited = async (req, res) => {

    try {
        let page = req.query.page || 1;
        console.log('isSaved')
        console.log('query ==============',req.query);
        const title = 'تسيير استهلاك المياه';
        let searchTerm = req.query.searchTerm ;
        let passedQuery='/unedited?'+(searchTerm!=undefined && searchTerm!=null? 'isSaved=not-saved&searchTerm='+searchTerm:'');

        //= { consumers, count, pages, hasNextPage, nextPage, hasPreviousPage, previousPage }
        const datas = await search.find({ searchTerm, page, isSaved: false, sort: 'no+1' });

        datas.title = title;
        res.render('consumer/read/table',
        { ...datas, passedQuery}
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



