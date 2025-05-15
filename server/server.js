require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');

require('./config/db');
const initializeDatabase = require('./config/initializeDatabase');

const app = express();
app.use(cors());
app.use(express.json());


initializeDatabase().then(() => {
  console.log('Database check complete');
}).catch(err => {
  console.error('Failed to initialize database:', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
