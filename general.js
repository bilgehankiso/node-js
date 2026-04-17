// general.js - Functions to retrieve and search books using async/await with Axios

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load books data from JSON file
const booksFile = path.join(__dirname, 'booksdata.json');
let books = JSON.parse(fs.readFileSync(booksFile, 'utf8'));

// Get all books
async function getAllBooks() {
  try {
    return new Promise((resolve, reject) => {
      resolve(books);
    });
  } catch (error) {
    throw error;
  }
}

// Get books by ISBN using async/await
async function getBookByISBN(isbn) {
  try {
    const result = {};
    for (const key in books) {
      if (books[key].isbn === isbn) {
        result[key] = books[key];
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
}

// Get books by Author using async/await
async function getBookByAuthor(author) {
  try {
    const result = {};
    for (const key in books) {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        result[key] = books[key];
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
}

// Get books by Title using async/await
async function getBookByTitle(title) {
  try {
    const result = {};
    for (const key in books) {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        result[key] = books[key];
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
}

// Get book reviews
async function getBookReview(bookId) {
  try {
    if (books[bookId]) {
      return books[bookId].reviews;
    }
    return {};
  } catch (error) {
    throw error;
  }
}

// Add or update a review
function addOrUpdateReview(bookId, userId, review) {
  if (books[bookId]) {
    books[bookId].reviews[userId] = review;
    // Persist to file
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
    return true;
  }
  return false;
}

// Delete a review
function deleteReview(bookId, userId) {
  if (books[bookId] && books[bookId].reviews[userId]) {
    delete books[bookId].reviews[userId];
    // Persist to file
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
    return true;
  }
  return false;
}

// Refresh books from file (for concurrent access)
function refreshBooks() {
  books = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
  getBookReview,
  addOrUpdateReview,
  deleteReview,
  refreshBooks
};
