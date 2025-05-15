const express = require('express');
const router = express.Router();
const { sql, poolPromise }  = require('../config/db');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query`SELECT Id, Name FROM Departments`;
    res.json(result.recordset);
  } catch (err) {
    console.error('Fetch departments error:', err);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

module.exports = router;
