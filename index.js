// index.js - Main Express server application

const express = require('express');
const session = require('express-session');
const general = require('./general');
const auth = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware to track current user
app.use((req, res, next) => {
  if (req.session.username) {
    req.user = req.session.username;
  }
  next();
});

// =============== BOOK RETRIEVAL ROUTES ===============

// Get all books
app.get('/books', async (req, res) => {
  try {
    general.refreshBooks();
    const allBooks = await general.getAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get book by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
  try {
    general.refreshBooks();
    const book = await general.getBookByISBN(req.params.isbn);
    if (Object.keys(book).length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get books by Author
app.get('/books/author/:author', async (req, res) => {
  try {
    general.refreshBooks();
    const books = await general.getBookByAuthor(req.params.author);
    if (Object.keys(books).length === 0) {
      return res.status(404).json({ message: 'No books found by this author' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get books by Title
app.get('/books/title/:title', async (req, res) => {
  try {
    general.refreshBooks();
    const books = await general.getBookByTitle(req.params.title);
    if (Object.keys(books).length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews for a book
app.get('/books/review/:bookid', async (req, res) => {
  try {
    general.refreshBooks();
    const reviews = await general.getBookReview(req.params.bookid);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============== AUTHENTICATION ROUTES ===============

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const result = auth.registerUser(username, password);
  res.json(result);
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const result = auth.loginUser(username, password);
  
  if (result.success) {
    req.session.username = username;
  }
  
  res.json(result);
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'User logged out successfully' });
  });
});

// =============== REVIEW MANAGEMENT ROUTES ===============

// Add or update a review
app.put('/books/review/:bookid', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  
  const { review } = req.body;
  const bookId = req.params.bookid;
  const username = req.user;
  
  if (!review) {
    return res.status(400).json({ message: 'Review content is required' });
  }
  
  general.refreshBooks();
  const success = general.addOrUpdateReview(bookId, username, review);
  
  if (!success) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  general.refreshBooks();
  const updatedReviews = general.getBookReview(bookId);
  
  res.json({ 
    message: `Review for book ${bookId} added/updated successfully`,
    reviews: updatedReviews 
  });
});

// Delete a review
app.delete('/books/review/:bookid', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  
  const bookId = req.params.bookid;
  const username = req.user;
  
  general.refreshBooks();
  const success = general.deleteReview(bookId, username);
  
  if (!success) {
    return res.status(404).json({ message: 'Review not found' });
  }
  
  res.json({ message: `Review for book ${bookId} deleted successfully` });
});

// =============== HEALTH CHECK ===============

app.get('/', (req, res) => {
  res.json({ message: 'Express Book Review API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
