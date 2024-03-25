const sequelize = require('sequelize');
const database = require('../db');
const schema = "";

class Request extends sequelize.Model{}

Request.init(
    {
        RequestID: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true
        },
        RequesterName: {
            type: sequelize.STRING,
            allowNull: false,
        },
        ItemDescription: {
            type: sequelize.STRING,
            allowNull: false,
        },
        ProductPrice: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        Quantity: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        RequestStatus: {
            type: sequelize.STRING,
            allowNull: false,
        },
        StatusDescription: {
            type: sequelize.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: database, modelName: 'PurchaseRequests', schema
    }
);

module.exports = Request;