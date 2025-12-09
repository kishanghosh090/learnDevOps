const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PORT = 5050;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read environment variables passed from docker-compose
const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

// IMPORTANT: authSource=admin because the root user is created in the admin DB
const MONGO_URL = `mongodb://${username}:${password}@mongo:27017/?authSource=admin`;

const client = new MongoClient(MONGO_URL);

// GET all users
app.get("/getUsers", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("apnacollege-db");
    const users = await db.collection("users").find().toArray();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await client.close();
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("apnacollege-db");
    const result = await db.collection("users").insertOne(req.body);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await client.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
