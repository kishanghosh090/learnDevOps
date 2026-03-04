const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.username,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
  ssl: {
    rejectUnauthorized: false,
  },
});

function query(text, params) {
  return pool.query(text, params);
}

// query(
//   `
//   CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255))`,
// );
// query(
//   `INSERT INTO users (name, email, password) VALUES ('John Doe', 'john@example.com', 'password123')`,
// );

query("SELECT * FROM users")
  .then((res) => {
    console.log(res.rows);
    pool.end();
  })
  .catch((err) => {
    console.error(err);
    pool.end();
  });