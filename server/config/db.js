const sql = require('mssql');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const config = {
  server: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
