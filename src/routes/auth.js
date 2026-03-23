const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  const { full_name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
    [full_name, email, hashedPassword, 'user']
  );

  res.status(201).json({ message: 'User registered' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [users] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (users.length === 0) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const user = users[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    'secret123'
  );

  res.json({ token });
});

module.exports = router;
