import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "server is working properly" });
});

app.listen(PORT, () => {
  console.log(`server is listing at PORT : ${PORT}`);
});
