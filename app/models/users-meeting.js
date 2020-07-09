module.exports = function(sequelize, Sequelize) {

    var Users_meeting = sequelize.define('users-meeting', {

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


        startTime: {
            type: Sequelize.DATE
        },

        endTime: {
            type: Sequelize.DATE
        },

        cost: {
            type: Sequelize.FLOAT
        },

    });

    return Users_meeting;

}

