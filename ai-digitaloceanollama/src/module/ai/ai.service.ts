import axios from "axios";

export const generateWithOllama = async (prompt: string) => {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "phi",
      prompt,
      stream: false,
    },
    {
      timeout: 120000, // important for AI
    },
  );

  return response.data.response;
};
