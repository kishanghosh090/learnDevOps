import express from "express";

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.json({
    message: "hello from the server",
  });
});

app.listen(PORT, () => {
  console.log(`server is up and runinng at PORT ${PORT}`);
});
