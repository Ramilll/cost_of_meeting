module.exports = function(sequelize, Sequelize) {

    var Wage = sequelize.define('wage', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },

        salary: {
            type: Sequelize.INTEGER
        },
    });

    return Wage;

}

