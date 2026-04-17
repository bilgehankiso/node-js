# Express Book Review - Testing Guide

This document provides step-by-step instructions for testing the Express Book Review API and collecting the required cURL commands and outputs for the final project submission.

## Prerequisites

1. Node.js installed (version 12 or higher)
2. npm installed
3. Terminal/Command Prompt access
4. The bookstore application running on localhost:5000

## Setup

1. Navigate to the project directory:
```bash
cd /Users/bilgehankiso/Documents/GitHub/node-js/bookstore
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

You should see: `Server is running on http://localhost:5000`

## Testing Commands and Outputs

### TASK 1: GitHub Repository Fork Status

Save this output as **githubrepo.txt**

```bash
curl -s https://api.github.com/repos/bilgehankiso/expressBookReview | grep '"fork"'
```

Expected output:
```
  "fork": true,
```

**Note:** The repository will show as forked once you fork the official expressBookReview repo or create your own.

---

### TASK 2: Get All Books

Save this output as **getallbooks.txt**

```bash
curl http://localhost:5000/books
```

Expected output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {},
    "isbn": "978-0385474542"
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {},
    "isbn": "978-0143039815"
  },
  "3": {
    "author": "Dante Alighieri",
    "title": "The Divine Comedy",
    "reviews": {},
    "isbn": "978-0142437223"
  },
  "4": {
    "author": "Unknown",
    "title": "The Epic of Gilgamesh",
    "reviews": {},
    "isbn": "978-0140449198"
  },
  "5": {
    "author": "Unknown",
    "title": "One Thousand and One Nights",
    "reviews": {},
    "isbn": "978-0199555239"
  },
  "6": {
    "author": "Unknown",
    "title": "Njál's Saga",
    "reviews": {},
    "isbn": "978-0141439815"
  },
  "7": {
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {},
    "isbn": "978-0141439518"
  },
  "8": {
    "author": "Honoré de Balzac",
    "title": "Le Père Goriot",
    "reviews": {},
    "isbn": "978-0140449174"
  },
  "9": {
    "author": "Samuel Beckett",
    "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
    "reviews": {},
    "isbn": "978-0140181296"
  },
  "10": {
    "author": "Giovanni Boccaccio",
    "title": "The Decameron",
    "reviews": {},
    "isbn": "978-0142437339"
  }
}
```

---

### TASK 3: Get Books by ISBN

Save this output as **getbooksbyISBN.txt**

```bash
curl http://localhost:5000/books/isbn/978-0385474542
```

Expected output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {},
    "isbn": "978-0385474542"
  }
}
```

---

### TASK 4: Get Books by Author

Save this output as **getbooksbyauthor.txt**

```bash
curl http://localhost:5000/books/author/Chinua%20Achebe
```

Expected output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {},
    "isbn": "978-0385474542"
  }
}
```

---

### TASK 5: Get Books by Title

Save this output as **getbooksbytitle.txt**

```bash
curl http://localhost:5000/books/title/Things%20Fall%20Apart
```

Expected output:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {},
    "isbn": "978-0385474542"
  }
}
```

---

### TASK 6: Get Book Reviews

Save this output as **getbookreview.txt**

```bash
curl http://localhost:5000/books/review/1
```

Expected output (initially empty):
```json
{}
```

---

### TASK 7: Register a New User

Save this output as **register.txt**

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

Expected output:
```json
{
  "success": true,
  "message": "User testuser registered successfully"
}
```

---

### TASK 8: Login User

Save this output as **login.txt**

First, to get the session cookie, use:

```bash
curl -c cookies.txt -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

Expected output:
```json
{
  "success": true,
  "message": "User testuser logged in successfully"
}
```

---

### TASK 9: Add or Update Review

Save this output as **reviewadded.txt**

```bash
curl -X PUT http://localhost:5000/books/review/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"review":"This is an excellent book! A must-read classic."}'
```

Expected output:
```json
{
  "message": "Review for book 1 added/updated successfully",
  "reviews": {
    "testuser": "This is an excellent book! A must-read classic."
  }
}
```

---

### TASK 10: Delete Review

Save this output as **deletereview.txt**

```bash
curl -X DELETE http://localhost:5000/books/review/1 \
  -b cookies.txt
```

Expected output:
```json
{
  "message": "Review for book 1 deleted successfully"
}
```

---

### TASK 11: General.js File Implementation

The **general.js** file contains the following functions implemented using async/await with file I/O:

1. **getAllBooks()** - Retrieves all books from the JSON file
2. **getBookByISBN(isbn)** - Searches and retrieves books by ISBN
3. **getBookByAuthor(author)** - Searches and retrieves books by author name
4. **getBookByTitle(title)** - Searches and retrieves books by title
5. **getBookReview(bookId)** - Gets reviews for a specific book
6. **addOrUpdateReview(bookId, userId, review)** - Adds or updates a review
7. **deleteReview(bookId, userId)** - Deletes a review for a book
8. **refreshBooks()** - Reloads book data from file for concurrent access handling

All functions use async/await patterns to handle asynchronous operations and file I/O operations.

## Quick Testing Script

To speed up testing, you can create a file `test_commands.sh`:

```bash
#!/bin/bash

echo "=== TASK 2: Get All Books ==="
curl http://localhost:5000/books > getallbooks.txt
echo "\n"

echo "=== TASK 3: Get Books by ISBN ==="
curl http://localhost:5000/books/isbn/978-0385474542 > getbooksbyISBN.txt
echo "\n"

echo "=== TASK 4: Get Books by Author ==="
curl http://localhost:5000/books/author/Chinua%20Achebe > getbooksbyauthor.txt
echo "\n"

echo "=== TASK 5: Get Books by Title ==="
curl http://localhost:5000/books/title/Things%20Fall%20Apart > getbooksbytitle.txt
echo "\n"

echo "=== TASK 6: Get Book Reviews ==="
curl http://localhost:5000/books/review/1 > getbookreview.txt
echo "\n"

echo "=== TASK 7: Register User ==="
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' > register.txt
echo "\n"

echo "=== TASK 8: Login User ==="
curl -c cookies.txt -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' > login.txt
echo "\n"

echo "=== TASK 9: Add Review ==="
curl -X PUT http://localhost:5000/books/review/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"review":"This is an excellent book!"}' > reviewadded.txt
echo "\n"

echo "=== TASK 10: Delete Review ==="
curl -X DELETE http://localhost:5000/books/review/1 \
  -b cookies.txt > deletereview.txt
echo "\n"

echo "All tests completed! Output files created."
```

Run with:
```bash
bash test_commands.sh
```

## Submission Files

You need to save and submit the following files:

1. **githubrepo.txt** - GitHub fork status
2. **getallbooks.txt** - All books output
3. **getbooksbyISBN.txt** - Books by ISBN output
4. **getbooksbyauthor.txt** - Books by author output
5. **getbooksbytitle.txt** - Books by title output
6. **getbookreview.txt** - Reviews output
7. **register.txt** - Registration output
8. **login.txt** - Login output
9. **reviewadded.txt** - Review added output
10. **deletereview.txt** - Review deleted output
11. **general.js** - The general.js file with implementation

Plus provide:
- GitHub repository URL
- Screenshots showing the server running and test outputs
