require('dotenv').config();
// susikuriam serveri
const express = require('express');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dbConfig = require('./config');
const postsRouter = require('./routes/postsRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// prisidedam morgan
// GET / - msg: server online
app.get('/', (req, res) => {
  res.json({ msg: 'Server Online' });
});
// Routes
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
// 404 - returns json
app.use((req, resp) => {
  resp.status(404).json({ msg: 'Page not found' });
});

async function testDbConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT 1');
    console.log(`Connected to MYSQL db ${dbConfig.database}`.bgCyan.bold);
    conn.end();
  } catch (error) {
    console.log(`error connecting ot DB ${error.message}`.bgRed.bold);
    // console.log('error ---->', error);
    if (error.code === 'ECONNREFUSED') {
      console.log('is Xamp running ?'.yellow);
    }
  }
}

testDbConnection();

app.listen(PORT, () => console.log('Server is running'));
