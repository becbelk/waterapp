const Consumer = require('../model/consumer');
const calc = require('../misc/calculator')
const search = require('./search');

const Header = 1

// post search

exports.search = async (req, res) => {
    try {
        const title = 'بحث';
        const perPage = 10;
        let page = req.query.page || 1;

        let searchTerm=decodeURIComponent(req.cookies.searchTerm);
    let data=await search.text(searchTerm,page);
        res.render('index',data );
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
