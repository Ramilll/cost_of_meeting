var models           = require('../app/models');
var sequelize = require("sequelize");
path = require('path')
let Op = sequelize.Op

function isEmpty(obj) {
    for (let key in obj) {
        // если тело цикла начнет выполняться - значит в объекте есть свойства
        return false;
    }
    return true;
}

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
        models.users_meeting.create({userId: user.userId, meetingId: data.id, time:user.time, startTime: user.startTime, endTime: user.endTime, cost: user.costTime, company: req.user.company}).catch(function (err){console.log(err)})
    }
    models.current_meeting.update({alive: 0}, {where: {meetingId: data.id}}).catch(err=>console.log(err));
    res.send('OK')
}

exports.sendFilteredData = function(req, res) {
    models.users_meeting.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
    console.log('Trying to send filtered data')
    let data = req.body
    let startTime = data.startTime
    let endTime = data.endTime
    models.users_meeting.findAll({raw:true,
        where: {
        startTime: {[Op.gt]: startTime},
        endTime: {[Op.lt]: endTime},
        company: req.user.company,
        },
        attributes: [
            'userId',
            'company',
            [sequelize.fn('sum', sequelize.col('time')), 'meetingTime'],
            [sequelize.fn('sum', sequelize.col('cost')), 'costMeetingTime'],
            [sequelize.fn('count', sequelize.col('cost')), 'numberOfMeetings']
        ],
        group: ['userId'],
        include: {
            model: models.user,
            as: "user",
            attributes: ["name"],
        }
    }).then(filteredData=>{
        filteredData.forEach(item => item.name = item['user.name'])
        filteredData.forEach(item => delete item['user.name'])
        console.log(filteredData)
        res.send(filteredData);
    }).catch(err=>console.log(err));
}

exports.startMeeting = function(req, res){
    console.log("Meeting started")
    let data = req.body
    meetingId = req.params.meetingId
    models.current_meeting.create({meetingId: meetingId, password: data.password, startTime: data.startTime, company: req.user.company, costPerSecond: data.costPerSecond, alive: 1}).catch(function (err){console.log(err)})
    res.send('OK')
}

exports.meeting = function(req, res) {
    if (!req.query.pwd || !req.query.id) {
        res.send("Incorrect url")
    }
    let meetingId = req.query.id
    let pwd = req.query.pwd
    models.current_meeting.findByPk(meetingId, {raw:true}).then(meeting => {
        if (!meeting) {
            res.send('This meeting does not exist')
        }
        else if (meeting.password !== pwd) {
            res.send('Incorrect password')
        }
        else{
            res.render('meetingUser')
        }
    }).catch(function (err){console.log(err)})
}

exports.giveMeetingData = function(req, res){
    let pwd = req.body.password
    let meetingId = req.params.meetingId
    models.current_meeting.findByPk(meetingId, {raw: true, attributes: ['meetingId', 'startTime', 'costPerSecond', 'password', 'alive']}).then(meeting =>{
        if (!meeting) {
            res.send('This meeting does not exist')
        }
        else if (meeting.password !== pwd) {
            res.send('Incorrect password')
        }
        else{
            res.send([meeting])
        }
    }).catch(function (err){console.log(err)})
}

exports.createMeeting = function (req, res) {
    res.render('createMeeting');
}

exports.directorEnter = function (req, res) {
    res.render('directorEnter.html');
}