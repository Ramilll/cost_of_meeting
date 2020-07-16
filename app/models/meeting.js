module.exports = function(sequelize, Sequelize) {

    var Meeting = sequelize.define('meeting', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING
        },

        link: {
            type: Sequelize.STRING
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

    return Meeting;

}

