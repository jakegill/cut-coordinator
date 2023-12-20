import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  keyFilename: "./api/cut-coordinator-408715-94a6e1705d1b.json",
});
const bucket = storage.bucket("cc-img-bucket-1");

export async function uploadImg(file) {
  const uniqueFileName = `${uuidv4()}-${file.originalname}`;

  const blob = bucket.file(uniqueFileName);
  const blobStream = blob.createWriteStream({
    metadata: { contentType: file.mimetype },
  });

  blobStream.on("error", (err) => {
    throw new Error("Blob stream error: " + err.message);
  });

  blobStream.end(file.buffer);

  return new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
  });
}
