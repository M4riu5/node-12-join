const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');
// sukurti routeri
const postsRouter = express.Router();
// parsisiusti pilna postu info
postsRouter.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT posts.p_id AS id, posts.title, posts.body, categories.name AS category FROM posts LEFT JOIN categories ON posts.category_id = categories.c_id;
`;
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
// GET /api/posts - parsisiusti pilna postu info su category name
module.exports = postsRouter;
