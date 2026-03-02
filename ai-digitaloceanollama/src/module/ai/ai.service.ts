import axios from "axios";

export const generateWithOllama = async (prompt: string) => {
  try {
    console.log("Sending request to Ollama with prompt:", prompt);

    const response = await axios.post(
      "http://ollama:11434/api/generate",
      {
        model: "phi",
        prompt,
        stream: false,
      },
      {
        timeout: 120000, // important for AI
      },
    );

    console.log("Ollama response received:", response.data);
    return response.data.response;
  } catch (error: any) {
    console.error("Ollama API Error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

export const streamFromOllama = async (prompt: string) => {
  console.log("Starting stream for prompt:", prompt);

  const response = await axios.post(
    "http://ollama:11434/api/generate",
    {
      model: "phi",
      prompt,
      stream: true,
    },
    {
      responseType: "stream",
      timeout: 120000,
    },
  );

  return response;
};
