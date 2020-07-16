var authController = require('../../controllers/authcontroller.js');
var models           = require('../../app/models');


module.exports = function(app, passport) {

    app.get('/getUsers', function(req,res) {
        models.user.findAll({raw:true, where: {company: req.user.company}}).then(users=>{
            res.send(users);
        }).catch(err=>console.log(err));
    })

    app.get('/getWages',function(req,res) {
        models.wage.findAll({raw:true, where: {company: req.user.company}}).then(wages=>{
            res.send(wages);
        }).catch(err=>console.log(err))
    })

    app.get('/getUsers_meeting',function(req,res) {
        models.users_meeting.findAll({raw:true, where: {company: req.user.company}}).then(users_meetings=>{
            res.send(users_meetings);
        }).catch(err=>console.log(err))
    })

    app.get('/getMeetingId', function(req, res){
        models.meeting.findAll({raw:true}).then(meetings=>{
            var latestMeetingId = meetings[meetings.length - 1].id
            res.send([latestMeetingId])
        })
    })

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });

    app.post('/sendMeetingData/:meetingId', authController.DataProcessing)

    app.get('/meeting/:meetingId', authController.meeting)

    app.get('/createMeeting', isAdmin, authController.createMeeting)

    app.get('/user', isUser, authController.user);

    app.get('/admin', isAdmin, authController.admin);

    app.get('/director', isDirector, authController.director);

    app.get('/login', authController.login);

    app.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            if (req.user.role == 'admin') {
                //res.send(req.user.name)
                res.redirect('/admin')
            }
            if (req.user.role == 'user') {
                //res.send(req.user.name)
                res.redirect('/user')
            }
            if (req.user.role == 'director') {
                //res.send(req.user.name)
                res.redirect('/director')
            }

        });

    app.get('/*', function (req, res) {
        res.redirect('/login')
    })

    function isUser(req, res, next) {
        if ((req.isAuthenticated()) && (req.user.role === 'user'))
            return next();
        res.redirect('/login');
    }

    function isAdmin(req, res, next) {
        if ((req.isAuthenticated())  && (req.user.role === 'admin'))
            return next();
        res.redirect('/login');
    }

    function isDirector(req, res, next) {
        if ((req.isAuthenticated()) && (req.user.role === 'director'))
            return next();
        res.redirect('/login');
    }
}