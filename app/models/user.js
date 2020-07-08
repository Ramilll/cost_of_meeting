module.exports = function(sequelize, Sequelize) {  //change second argument to DataTypes instead of Sequilize

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

    return User;

}

