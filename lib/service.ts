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

minioClient
  .makeBucket("nextjs-gallery", "", { ObjectLocking: true })
  .then(() => {
    console.log(
      "Bucket created successfully on play-min.io and enabled object lock"
    );
  })
  .catch((err) => {
    console.log("Error creating bucket with object lock.", err);
  });
