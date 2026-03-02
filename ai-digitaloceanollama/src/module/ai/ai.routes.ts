import { Router } from "express";
import { streamGenerate } from "./ai.controller";

const router = Router();

// router.post("/generate", generateText);
router.post("/stream", streamGenerate);

export default router;
