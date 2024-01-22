const search = require('./search');


// post search

exports.search = async (req, res) => {
    try {
        let page = req.query.page || 1;

        let searchTerm = req.body.searchTerm;
        let isSaved = (req.body.isSaved == "on") || false //decodeURIComponent(req.cookies.searchTerm);;
        console.log('body=' + JSON.stringify(req.body))
        let data = await search.find({ searchTerm, page, isSaved: isSaved, sort: 'no+1' });
        res.render("consumer/read/table", data);
    } catch (error) {
        console.log(error);
    }

}





/** logout */
exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

}

exports.about = async (req, res) => {
    const title = 'تسيير استهلاك المياه';
    res.render('about', { title });
}
