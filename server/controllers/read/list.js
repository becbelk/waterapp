const search = require('../search.js');
//const Consumer = require('../model/consumer.js');
exports.list = async (req, res) => {

    try {
        let page = req.query.page || 1;
        const title = 'تسيير استهلاك المياه';
        let searchTerm = (req.body.searchTerm != null) ?
            req.body.searchTerm : decodeURIComponent(req.cookies.searchTerm);
      const datas= { consumers,count, pages,  hasNextPage, nextPage,   hasPreviousPage, previousPage } 
      = await search.find(searchTerm, page,true,'no+1');
             datas.title=title;
        res.render('read/list', 
            datas
        );
    } catch (e) {
        console.log(e)
    }

};

