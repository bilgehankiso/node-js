// auth.js - User authentication and session management

const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');

// Load or initialize users file
let users = {};
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
} else {
  fs.writeFileSync(usersFile, JSON.stringify({}, null, 2));
}

// Register a new user
function registerUser(username, password) {
  if (users[username]) {
    return { success: false, message: 'User already exists' };
  }
  
  users[username] = {
    password: password, // In production, hash this!
    registeredAt: new Date()
  };
  
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return { success: true, message: `User ${username} registered successfully` };
}

// Login user
function loginUser(username, password) {
  if (!users[username]) {
    return { success: false, message: 'User does not exist' };
  }
  
  if (users[username].password !== password) {
    return { success: false, message: 'Invalid credentials' };
  }
  
  return { success: true, message: `User ${username} logged in successfully` };
}

// Check if user is authenticated
function isUserAuthenticated(username) {
  return !!users[username];
}

module.exports = {
  registerUser,
  loginUser,
  isUserAuthenticated,
  users
};
