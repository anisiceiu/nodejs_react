const sql = require('mssql');

const config = {
  server: 'DESKTOP-2C2G6KS',
  port: 1433,
  user: 'sa',
  password: 'Sa123',
  database: 'EmployeeDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 30000,
    instanceName: 'SQLEXPRESS'
  }
};

// Create a pool and export the poolPromise
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('MSSQL Connected');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed!', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};
