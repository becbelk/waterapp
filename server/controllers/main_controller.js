



/** logout */
exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');

}

exports.about = async (req, res) => {
    const title = 'تسيير استهلاك المياه';
    res.render('about', { title });
}
