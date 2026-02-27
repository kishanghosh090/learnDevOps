import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.json({
    message: "Hello from Load Balancer",
    instanceId: process.env.INSTANCE_ID || "unknown",
  });
});

app.listen(PORT, () => {
  console.log(`Load Balancer is running on port ${PORT}`);
});

//  autocannon -c30 -d10 http://localhost:3000 used to make concurrent requests to test load balancer (30 concurrent connections for 10 seconds)
