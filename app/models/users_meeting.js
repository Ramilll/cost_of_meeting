module.exports = function(sequelize, Sequelize) {

    var Users_meeting = sequelize.define('users_meeting', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },

        userId: {
            type: Sequelize.INTEGER
        },

        meetingId: {
            type: Sequelize.INTEGER
        },

        time: {
            type: Sequelize.FLOAT
        },


        startTime: {
            type: Sequelize.DATE
        },

        endTime: {
            type: Sequelize.DATE
        },

        cost: {
            type: Sequelize.FLOAT
        },

        company: {
            type: Sequelize.STRING,
        }

    });

    return Users_meeting;

}

