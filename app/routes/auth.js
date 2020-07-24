var authController = require('../../controllers/authcontroller.js');
var models           = require('../../app/models');
var path = require('path')

module.exports = function(app, passport) {

    app.get('/users/photo/:id', isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, '../../avatars', req.params.id + '.png'));
    })

    app.get('/getUserData', isAuthenticated, function (req, res) {
        res.send([req.user.name, req.user.id])
    })

    app.get('/getUsers', isAdmin, function(req,res) {
        models.user.findAll({raw:true, where: {company: req.user.company}, attributes: ['id', 'name', 'wageId']}).then(users=>{
            res.send(users);
        }).catch(err=>console.log(err));
    })

    app.get('/getWages', isAuthenticated, function(req,res) {
        models.wage.findAll({raw:true, where: {company: req.user.company}}).then(wages=>{
            res.send(wages);
        }).catch(err=>console.log(err))
    })

    app.get('getMeetingId_', function(req, res){

    })

    app.get('/getMeetingId', function(req, res){
        models.meeting.findAll({raw:true}).then(meetings=>{
            if (meetings) {
                res.send([meetings[meetings.length - 1].id])
            }
            else res.send([100])
        })
    })

    app.get('/getCurrentMeetingId', function (req, res) {
        models.current_meeting.findAll({raw:true}).then(meetings=>{
            if (meetings) {
                res.send([meetings[meetings.length - 1].meetingId])
            }
            else res.send([100])
        })
    })

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });

    app.get('/isMeetingAlive/:meetingId', authController.isMeetingAlive)

    app.post('/getMeetingData/:meetingId', authController.giveMeetingData)

    app.post('/startMeeting/:meetingId', isAdmin, authController.startMeeting)

    app.post('/getFilteredData', authController.sendFilteredData)

    app.post('/sendMeetingData/:meetingId', authController.dataProcessing)

    app.get('/meeting', authController.meeting)

    app.get('/createMeeting', isAdmin, authController.createMeeting)

    app.get('/user', isUser, authController.user);

    app.get('/admin', isAdmin, authController.admin);

    app.get('/director', isDirector, authController.director);

    app.get('/directorEnter', isDirector, authController.directorEnter)

    app.get('/login', authController.login);

    app.post('/login',
        passport.authenticate('local-login', {failureRedirect: '/login', failureFlash: true}),
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

    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login')
    }

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