import express from "express";

const app = express();

app.use(express.json());

// Import AI routes
import aiRoutes from "./module/ai/ai.routes";
app.use("/api/ai", aiRoutes);

export default app;
