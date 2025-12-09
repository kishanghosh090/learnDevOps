import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:3000",
      // add production url
      "http://5.223.78.185:5174"
    ],
    credentials: true,
  })
);

// API Route
app.get("/api/message", (req, res) => {
  res.json({ message: "hello from chai code server" });
});

const PORT = 4000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`server is running at PORT ${PORT}`);
});
