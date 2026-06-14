import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "./s3-client";

export const createPresignedUrlWithClient = ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const createPresignedUrlWithClientToGetObjectFromBucket = ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};
