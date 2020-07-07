var exports = module.exports = {}


exports.login = function(req, res) {
    console.log('New reload')
    res.render('login')
}

exports.userboard = function(req, res) {

    res.render('user');

}