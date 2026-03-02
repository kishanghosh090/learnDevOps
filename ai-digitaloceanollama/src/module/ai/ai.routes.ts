import { Router } from "express";
import { generateText } from "./ai.controller";

const router = Router();

router.post("/generate", generateText);

export default router;
