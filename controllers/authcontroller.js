var models           = require('../app/models');
var sequelize = require("sequelize");
let Op = sequelize.Op

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

exports.dataProcessing = function (req, res) {
    let data = req.body
    console.log('Processing Data: ')
    console.log(data)
    models.meeting.create({id: data.id, link:'meeting/'+data.id,  name: data.name, startTime: data.startTime, endTime: data.endTime, cost: data.cost, company: req.user.company}).catch(function (err){console.log(err)})
    for (let user of data.users){
        models.user.increment('meetingTime', { by: data.time, where: { id: user.userId } }).catch(function (err){console.log(err)})
        models.user.increment('costMeetingTime', { by: user.costTime, where: { id: user.userId } }).catch(function (err){console.log(err)})
    }
    for (let user of data.users){
        models.users_meeting.create({userId: user.userId, meetingId: data.id, time:user.time, startTime: user.startTime, endTime: user.endTime, cost: user.costTime, company: req.user.company}).catch(function (err){console.log(err)})
    }
    res.send('OK')
}

exports.sendFilteredData = function(req, res) {
    console.log('Trying to send filtered data')
    let data = req.body
    let startTime = data.startTime
    let endTime = data.endTime
    models.users_meeting.findAll({raw:true,
        where: {
        startTime: {[Op.gt]: startTime},
        endTime: {[Op.lt]: endTime},
        //company: req.user.company,
        },
        attributes: [
            'userId',
            'company',
            [sequelize.fn('sum', sequelize.col('time')), 'meetingTime'],
            [sequelize.fn('sum', sequelize.col('cost')), 'costMeetingTime'],
        ],
        group: ['userId'],
    }).then(filteredData=>{
        console.log(filteredData)
        res.send(filteredData);
    }).catch(err=>console.log(err));
}

exports.meeting = function(req, res) {
    res.render('meeting');
}

exports.createMeeting = function (req, res) {
    res.render('createMeeting');
}

exports.directorEnter = function (req, res) {
    res.render('directorEnter.html');
}