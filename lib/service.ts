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

export const createObject = async ({
  bucketName,
  objectName,
  objectStream,
  objectSize,
  objectMetaData,
}: {
  bucketName: string;
  objectName: string;
  objectStream: string;
  objectSize?: number;
  objectMetaData?: Record<string, unknown>;
}) => {
  try {
    const result = await minioClient.putObject(
      bucketName,
      objectName,
      objectStream,
      objectSize,
      objectMetaData
    );

    return result;
  } catch (error) {
    console.log("Error creating object", error);
  }
};

minioClient
  .fGetObject("nextjs-gallery", "galaxy.jpeg", "./galaxy.jpeg")
  .then(function (result) {
    console.log("Successfully downloader data.", result);
  })
  .catch(function (error) {
    console.log(error);
  });
