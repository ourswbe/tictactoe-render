import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "TicTacToe",
  password: "1234", // свой пароль
  port: 5432,
});

app.post("/save-result", async (req, res) => {
  const { result } = req.body;

  await pool.query(
    "INSERT INTO game_results (result) VALUES ($1)",
    [result]
  );

  res.send("ok");
});

app.listen(3000, () => console.log("server started"));