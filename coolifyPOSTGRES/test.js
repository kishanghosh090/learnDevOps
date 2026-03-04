const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_URI,
});

async function testConnection() {
  try {
    console.log("Connecting to PostgreSQL...");
    await client.connect();
    console.log("✓ Successfully connected to the database!");

    const result = await client.query("SELECT NOW()");
    console.log("✓ Database is responsive");
    console.log(`  Current time from DB: ${result.rows[0].now}`);

    const dbInfo = await client.query("SELECT version()");
    console.log(`✓ PostgreSQL version:\n  ${dbInfo.rows[0].version}`);
  } catch (error) {
    console.error("✗ Connection failed:");
    console.error(`  Error: ${error.message}`);
    process.exit(1);
  } finally {
    await client.end();
    console.log("\n✓ Connection closed");
  }
}

testConnection();
