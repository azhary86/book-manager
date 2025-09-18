// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tambahkan model ke db object
db.Book = Book;

// Synchronize semua model dengan database
db.initialize = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    
    // Sync semua model
    await db.sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = db;