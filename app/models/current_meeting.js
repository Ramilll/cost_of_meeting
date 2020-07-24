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
        },

        alive: {
            type: Sequelize.INTEGER,
            default: 0
        }

    });

    return Current_meeting;

}

