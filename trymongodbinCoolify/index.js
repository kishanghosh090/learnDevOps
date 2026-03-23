require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Client
let client;
let db;

// Middleware
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db("testdb");
    console.log("✅ Connected successfully to MongoDB");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    return false;
  }
}

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "MongoDB Test Server",
    status:
      client && client.topology && client.topology.isConnected()
        ? "connected"
        : "disconnected",
  });
});

// Test MongoDB connection
app.get("/test-connection", async (req, res) => {
  try {
    if (!client || !client.topology || !client.topology.isConnected()) {
      return res.status(503).json({
        error: "Database not connected",
        connected: false,
      });
    }

    // Ping the database
    await db.admin().ping();

    res.json({
      message: "MongoDB connection is working!",
      connected: true,
      database: db.databaseName,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      connected: false,
    });
  }
});

// Insert test data
app.post("/insert-test", async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: "Database not connected" });
    }

    const collection = db.collection("test");
    const testDoc = {
      message: "Test document",
      timestamp: new Date(),
      data: req.body.data || "Hello from Coolify MongoDB!",
    };

    const result = await collection.insertOne(testDoc);

    res.json({
      message: "Document inserted successfully",
      insertedId: result.insertedId,
      document: testDoc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all test documents
app.get("/get-test-data", async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: "Database not connected" });
    }

    const collection = db.collection("test");
    const documents = await collection.find({}).toArray();

    res.json({
      count: documents.length,
      documents: documents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
async function startServer() {
  const connected = await connectToMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (connected) {
      console.log("📊 MongoDB Status: Connected");
      console.log("\nAvailable endpoints:");
      console.log(`  GET  http://localhost:${PORT}/`);
      console.log(`  GET  http://localhost:${PORT}/test-connection`);
      console.log(`  POST http://localhost:${PORT}/insert-test`);
      console.log(`  GET  http://localhost:${PORT}/get-test-data`);
    } else {
      console.log(
        "⚠️  MongoDB Status: Not Connected - Check your connection string",
      );
    }
  });
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
  process.exit(0);
});

startServer();
