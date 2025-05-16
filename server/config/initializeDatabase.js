require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { sql, poolPromise }  = require('./db');

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    const pool = await poolPromise;

    // Create Users table
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT * FROM sysobjects WHERE name='Users' AND xtype='U'
      )
      CREATE TABLE [dbo].[Users] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [FirstName] NVARCHAR(MAX) NOT NULL,
        [LastName] NVARCHAR(MAX) NOT NULL,
        [Username] NVARCHAR(MAX) NOT NULL,
        [Email] NVARCHAR(MAX) NOT NULL,
        [PasswordHash] NVARCHAR(MAX) NOT NULL
      );
    `);

    // Create Departments table
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT * FROM sysobjects WHERE name='Departments' AND xtype='U'
      )
      CREATE TABLE [dbo].[Departments] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL
      );
    `);

    // Create Employees table
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT * FROM sysobjects WHERE name='Employees' AND xtype='U'
      )
      CREATE TABLE [dbo].[Employees] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL,
        [Email] NVARCHAR(MAX) NOT NULL,
        [Position] NVARCHAR(50) NOT NULL,
        [Salary] DECIMAL(18,2) NOT NULL,
        [HireDate] DATETIME2 NOT NULL,
        [DepartmentId] INT NOT NULL,
        FOREIGN KEY (DepartmentId) REFERENCES Departments(Id)
      );
    `);

    console.log('✅ Database initialized successfully.');
  } catch (err) {
    console.error('❌ Database initialization failed:', err);
  } finally {
    sql.close();
  }
}

module.exports = initializeDatabase;
