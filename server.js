// server.js
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

// DB Initialize before start
db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });