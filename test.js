
var Sequelize = require("sequelize");
var sequelize = new Sequelize('database', 'remoteUser', 'remoteUser', {dialect: 'mysql', host: '192.168.200.64', "define": {
        "timestamps": false
    }, logging: false})
var User = sequelize.define('user', {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING
    },


    wageId: {
        type: Sequelize.INTEGER
    },


    meetingTime: {
        type: Sequelize.INTEGER
    },

    costMeetingTime: {
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING,
    },

    password: {
        type: Sequelize.STRING,
    },

    role: {
        type: Sequelize.STRING,
    },
});

sequelize.sync().then(result=>{
    //console.log(result);
})
    .catch(err=> console.log(err));

User.findOne({where: {email: "test@test.ru"}})
    .then(user=>{
        if(!user) return;
        console.log(user.name, user.wageId);
    }).catch(err=>console.log(err));