# Express Book Review API

A Node.js/Express application for managing books and reviews with user authentication.

## Setup Instructions

1. Install Node.js from [nodejs.org](https://nodejs.org)

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on http://localhost:5000

## cURL Commands for Testing

### Task 1: Check GitHub Repository
```bash
curl -s https://api.github.com/repos/bilgehankiso/bookstore | grep '"fork"'
```

### Task 2: Get All Books
```bash
curl http://localhost:5000/books
```

### Task 3: Get Books by ISBN
```bash
curl http://localhost:5000/books/isbn/978-0385474542
```

### Task 4: Get Books by Author
```bash
curl http://localhost:5000/books/author/Chinua%20Achebe
```

### Task 5: Get Books by Title
```bash
curl http://localhost:5000/books/title/Things%20Fall%20Apart
```

### Task 6: Get Book Reviews
```bash
curl http://localhost:5000/books/review/1
```

### Task 7: Register a New User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Task 8: Login User
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Task 9: Add or Update Review
First login to establish session, then:
```bash
curl -X PUT http://localhost:5000/books/review/1 \
  -H "Content-Type: application/json" \
  -b "connect.sid=YOUR_SESSION_ID" \
  -d '{"review":"Great book! Highly recommended."}'
```

### Task 10: Delete Review
```bash
curl -X DELETE http://localhost:5000/books/review/1 \
  -b "connect.sid=YOUR_SESSION_ID"
```

## Project Files

- `index.js` - Main Express server with all routes
- `general.js` - Book retrieval and search functions using async/await
- `auth.js` - User authentication and registration
- `booksdata.json` - Book data storage
- `package.json` - Project dependencies

## Features

- Get all available books
- Search books by ISBN, author, or title
- View book reviews
- User registration and authentication
- Add, update, and delete reviews
- Concurrent access handling with file-based persistence
