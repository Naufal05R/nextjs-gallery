import * as Minio from "minio";

const END_POINT: string = process.env.MINIO_END_POINT || "";
const SERVER_PORT: number = parseInt(process.env.MINIO_SERVER_PORT || "");
const SECURE_URL: boolean = process.env.MINIO_SECURE_URL === "true";
const ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY || "";
const SECRET_KEY: string = process.env.MINIO_SECRET_KEY || "";

const minioClient = new Minio.Client({
  endPoint: END_POINT,
  port: SERVER_PORT,
  useSSL: SECURE_URL,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY,
});

export const getAllBuckets = async () => {
  try {
    const buckets = await minioClient.listBuckets();

    return buckets;
  } catch (error) {
    console.log("Error getting all buckets", error);
  }
};

minioClient
  .putObject("nextjs-gallery", "test.txt", "../public/file.txt", undefined, {
    "Content-Type": "text/plain",
  })
  .then((result) => {
    console.log("Successfully uploaded data.", result);
  })
  .catch((error) => {
    console.log(error);
  });
