import express from "express";
import { createPresignedUrlWithClient } from "./s3";

const app = express();

const PORT = 5003;
app.get("/presignedUrl", async (req, res) => {
  // presigned URI
  const url = await createPresignedUrlWithClient({
    bucket: "ghoshkishanrana",
    key: "file1" + `${Date.now()}` + ".png",
  });
  return res.status(200).json({ url });
});
app.listen(PORT, () => {
  console.log(`server is listing at PORT ${PORT}`);
});
