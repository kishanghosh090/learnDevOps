import express from "express";

const app = express();

const PORT = 5003;
app.get("/presignedUrl", (req, res) => {
  // presigned URI
});
app.listen(PORT, () => {
  console.log(`server is listing at PORT ${PORT}`);
});
