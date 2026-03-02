import express from "express";
import path from "path";

const app = express();

app.use(express.json());

// Serve static files from public directory
//app.use(express.static(path.join(__dirname, "../public")));

// Serve chat.html as default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});

// Import AI routes
import aiRoutes from "./module/ai/ai.routes";
app.use("/api/ai", aiRoutes);

export default app;
