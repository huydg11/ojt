require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 5500;


app.use(bodyParser.json());
app.use(cors());


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true 
  }
};


sql.connect(config).then(pool => {
  console.log('Connected');

 
  app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }


    try {
      const result = await pool.request()
        .input('name', sql.NVarChar, name)
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, password)
        .query('INSERT INTO Users (Name, Email, Password) OUTPUT INSERTED.Id VALUES (@name, @email, @password)');


        const insertedId = result.recordset[0].Id;
        res.status(201).send(`User added with ID: ${insertedId}`);
    } catch (err) {
      console.error('SQL error', err);
      res.status(500).send('Server error');
    }
  });


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

}).catch(err => {
  console.error('Database connection error', err);
});
