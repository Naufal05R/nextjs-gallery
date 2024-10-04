import * as Minio from "minio";
import internal from "stream";

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
    console.error("Error getting all buckets: ", error);
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
  objectStream: internal.Readable | Buffer | string;
  objectSize?: number;
  objectMetaData?: Record<string, unknown>;
}) => {
  try {
    const result = await minioClient.putObject(bucketName, objectName, objectStream, objectSize, objectMetaData);

    return result;
  } catch (error) {
    console.error("Error creating object: ", error);
  }
};

export const getObject = async ({
  bucketName,
  objectName,
  filePath,
  options,
}: {
  bucketName: string;
  objectName: string;
  filePath: string;
  options: Parameters<typeof minioClient.fGetObject>[3];
}) => {
  try {
    const result = await minioClient.fGetObject(bucketName, objectName, filePath, options);

    return result;
  } catch (error) {
    console.error("Error getting object: ", error);
  }
};

export const streamObjects = ({ bucketName, includeMetadata }: { bucketName: string; includeMetadata?: boolean }) => {
  const stream: Minio.BucketStream<Minio.BucketItem> = includeMetadata
    ? minioClient.extensions.listObjectsV2WithMetadata(bucketName)
    : minioClient.listObjectsV2(bucketName);

  stream.on("data", function (data) {
    console.log("V2", data);
  });

  stream.on("error", function (err) {
    console.log(err);
  });
};
