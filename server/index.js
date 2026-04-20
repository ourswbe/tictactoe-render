// server/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TicTacToe",
  password: "kimademy713",
  port: 5432,
});

app.get('/', (req, res) => {
  res.json({ message: "TicTacToe API is running!" });
});

app.post('/save-result', async (req, res) => {
  const { result } = req.body;
  try {
    await pool.query(
      'INSERT INTO game_results (result) VALUES ($1)',
      [result]
    );
    res.send("saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});