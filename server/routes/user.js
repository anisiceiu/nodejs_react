const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { poolPromise } = require('../config/db');

// GET /profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Id', req.user.id)
      .query('SELECT Id, FirstName, LastName, Username, Email FROM Users WHERE Id = @Id');

    const user = result.recordset[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

// PUT /profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, username, email } = req.body;

  try {
    const pool = await poolPromise;

    await pool
      .request()
      .input('Id', req.user.id)
      .input('FirstName', firstName)
      .input('LastName', lastName)
      .input('Username', username)
      .input('Email', email)
      .query(`
        UPDATE Users
        SET FirstName = @FirstName,
            LastName = @LastName,
            Username = @Username,
            Email = @Email
        WHERE Id = @Id
      `);

    const updatedResult = await pool
      .request()
      .input('Id', req.user.id)
      .query('SELECT Id, FirstName, LastName, Username, Email FROM Users WHERE Id = @Id');

    res.json(updatedResult.recordset[0]);
  } catch (err) {
    console.error('Profile update failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
