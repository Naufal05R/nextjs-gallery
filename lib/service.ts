import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "",
  secretKey: "",
});
