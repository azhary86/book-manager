const { Book } = require('../models');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all books with optional filtering
exports.getAllBooks = async (req, res) => {
  try {
    const { author, year } = req.query;
    const where = {};
    
    if (author) where.author = author;
    if (year) where.year = year;
    
    const books = await Book.findAll({ where });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update book by ID
exports.updateBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    await book.update({ title, author, year });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    await book.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};