import express from "express";

const PORT = process.env.PORT || 4411;

const app = express();

app.get("/", (_req, res) => {
  return res.json({ message: "hello from chai code" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is listing at PORT ${PORT}`);
});
