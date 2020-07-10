var exports = module.exports = {}


exports.login = function(req, res) {
    res.render('login')
}

exports.user = function(req, res) {
    res.render('user');
}

exports.admin = function(req, res) {
    res.render('admin');
}

exports.director = function(req, res) {
    res.render('director');
}

exports.DataProcessing = function (req, res) {
    console.log('Processing Data')
    console.log(req.body)
    console.log(req.params.meetingId)
    res.send('OK')
}

exports.meeting = function(req, res) {
    res.render('meeting');
}

exports.createMeeting = function (req, res) {
    res.render('createMeeting');
}