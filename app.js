const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const logger = require('./middleware/logger');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger); 

// Routes
app.use('/books', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Database sync failed:', err);
  });

module.exports = app;