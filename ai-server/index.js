const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.post("/", async (req, res) => {
  const response = await axios.post(
    "http://127.0.0.1:9001/api/generate",
    {
      model: "phi3:mini",
      prompt: req.body.prompt,
      stream: false
    }
  );

  res.json({
    reply: response.data.response
  });
});


app.listen(8000, () =>
  console.log("AI backend running on port 8000")
);

