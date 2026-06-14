import express, { type Request, type Response } from "express";
import { createPresignedUrlWithClient } from "./s3";
import { randomUUIDv7 } from "bun";
import { ProductModel } from "./schema";
import { connectDB } from "./db";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.urlencoded({ extended: true }));
const PORT = 5003;

app.post("/presignedUrl", async (req: Request, res: Response) => {
  const { mime } = req.body as {
    mime: string;
  };
  const uuid = randomUUIDv7("hex");
  const fileName = uuid + `${Date.now()}.` + mime;
  // presigned URI
  const url = await createPresignedUrlWithClient({
    bucket: "ghoshkishanrana",
    key: fileName,
  });
  return res.status(200).json({ url, fileName });
});

app.post("/product", async (req: Request, res: Response) => {
  const { name, price, fileName } = req.body as {
    name: string;
    price: number;
    fileName: string;
  };
  try {
    const product = await ProductModel.create({
      name,
      price,
      fileName,
    });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
app.get("/product/:key", async (req: Request, res: Response) => {
  const key = req.params.key as string;
  const objectUrl = await createPresignedUrlWithClient({
    bucket: "ghoshkishanrana",
    key,
  });
  return res.status(200).json({ objectUrl });
});

app.get("/products", async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  return res.json(products);
});
app.listen(PORT, async () => {
  await connectDB();
  console.log("db connected");

  console.log(`server is listing at PORT ${PORT}`);
});
