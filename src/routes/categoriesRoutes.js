// sukurti routeri categorys
const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');

// GET /api/categories - parsiuncia visas kategorijas
const categoriesRouter = express.Router();

// GET /api/categories/count/
categoriesRouter.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT categories.name AS category, COUNT(posts.p_id) AS postid
    FROM categories
    LEFT JOIN posts
    ON posts.category_id = categories.c_id
    GROUP BY categories.name;`;
    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
    conn.end();
  } catch (error) {
    console.log('error ', error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});
module.exports = categoriesRouter;
