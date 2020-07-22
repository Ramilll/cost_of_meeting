module.exports = function(sequelize, Sequelize) {

    var Current_meeting = sequelize.define('current_meeting', {

        meetingId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false

        },

        startTime: {
            type: Sequelize.DATE
        },

        costPerSecond: {
            type: Sequelize.FLOAT
        },

        company: {
            type: Sequelize.STRING,
        }

    });

    return Current_meeting;

}

