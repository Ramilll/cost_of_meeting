var models           = require('../app/models');


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
    data = req.body
    console.log('Processing Data: ')
    console.log(data)
    models.meeting.create({id: data.id, link:'meeting/'+data.id,  name: data.name, startTime: data.startTime, endTime: data.endTime, cost: data.cost, company: req.user.company})
    for (let user of data.users){
        models.user.increment('meetingTime', { by: data.time, where: { id: user.userId } })
        models.user.increment('costMeetingTime', { by: user.costTime, where: { id: user.userId } })
    }
    for (let user of data.users){
        models.users_meeting.create({userId: user.userId, meetingId: data.id, startTime: user.startTime, endTime: user.endTime, cost: user.costTime, company: req.user.company})
    }
    res.send('OK')
}

exports.meeting = function(req, res) {
    res.render('meeting');
}

exports.createMeeting = function (req, res) {
    res.render('createMeeting');
}