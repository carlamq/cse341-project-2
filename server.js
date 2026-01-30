const express = require('express');
require('dotenv').config();
const mongodb = require('./src/data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Local server running on port 3000');
});

app.use((req, res, next) => {  //CORS to allow use API from browser or fronted
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./src/routes'));

mongodb.initDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });