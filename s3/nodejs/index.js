import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: "kishanpathifyys3",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  try {
    const url = await getObject("try.jpg");
    console.log("URL for image", url);
  } catch (err) {
    console.log(err);
  }
}
init();
