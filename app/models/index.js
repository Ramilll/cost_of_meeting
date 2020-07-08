"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '../..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, {dialect: config.dialect, host: config.host, define: config.define, logging: config.logging})

var db = {};


sequelize.authenticate()
    .then(() => {
        console.log('connected to DB');
    });

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;