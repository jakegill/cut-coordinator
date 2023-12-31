import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const storage = new Storage({
	credentials: {
		type: process.env.TYPE,
		project_id: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
		client_email: process.env.CLIENT_EMAIL,
		client_id: process.env.CLIENT_ID,
		auth_uri: process.env.AUTH_URI,
		token_uri: process.env.TOKEN_URI,
		auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
	},
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

export async function deleteImg(imageUrl) {
	const fileName = imageUrl.split("/").pop();

	try {
		await bucket.file(fileName).delete();
		return true;
	} catch (error) {
		console.error("Error deleting file from GCS:", error);
		throw new Error("Failed to delete file from GCS");
	}
}
