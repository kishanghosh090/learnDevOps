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
