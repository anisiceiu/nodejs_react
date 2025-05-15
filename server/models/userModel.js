const sql = require('../config/db');

async function findUserByEmail(email) {
  const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
  return result.recordset[0];
}

async function createUser(firstName, lastName, username, email, passwordHash) {
  await sql.query`
    INSERT INTO Users (FirstName, LastName, Username, Email, PasswordHash)
    VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${passwordHash})
  `;
}

module.exports = { findUserByEmail, createUser };
