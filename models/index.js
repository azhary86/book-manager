const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Book = Book;

// Synchronize all models to database
db.initialize = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    
    // Sync all
    await db.sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = db;