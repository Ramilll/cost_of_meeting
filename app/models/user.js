module.exports = function(sequelize, Sequelize) {

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
            type: Sequelize.FLOAT
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

        company: {
            type: Sequelize.STRING,
        }


    });

    return User;

}

