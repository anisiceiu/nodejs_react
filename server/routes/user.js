const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const sql = require('../config/db');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await sql.query`SELECT Id, FirstName, LastName, Username, Email FROM Users WHERE Id = ${req.user.id}`;
    const user = result.recordset[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, username, email } = req.body;

  try {
    await sql.query`
      UPDATE Users
      SET FirstName = ${firstName}, LastName = ${lastName},
          Username = ${username}, Email = ${email}
      WHERE Id = ${req.user.id}
    `;

    const updated = await sql.query`
      SELECT Id, FirstName, LastName, Username, Email FROM Users WHERE Id = ${req.user.id}
    `;
    res.json(updated.recordset[0]);
  } catch (err) {
    console.error('Profile update failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
