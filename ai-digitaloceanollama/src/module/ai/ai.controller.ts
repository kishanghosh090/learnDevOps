import { Request, Response } from "express";
import { generateWithOllama } from "./ai.service";

export const generateText = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const result = await generateWithOllama(prompt);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("AI error:", error.message);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};
