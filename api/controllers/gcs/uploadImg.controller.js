import { uploadImg } from "../../storage/storage.js"; //gcs
import Barber from "../../models/barber.model.js";
import Client from "../../models/client.model.js";

// Portfolio pictures
export const uploadPortfolio = async (req, res, next) => {
	try {
		//GCS
		const file = req.file;
		const email = req.params.email;
		const imgUrl = await uploadImg(file, email);

		//MongoDB
		const updatedBarber = await Barber.findOneAndUpdate(
			{ email: email },
			{ $push: { portfolio: imgUrl } }
		);

		res.status(200).json({ imgUrl });
	} catch (err) {
		next(err);
	}
};

// Profile pictures
export const uploadBarberProfile = async (req, res, next) => {
	try {
		const file = req.file;
		const email = req.params.email;
		const imgUrl = await uploadImg(file, email);

		const updatedBarber = await Barber.findOneAndUpdate(
			{ email: email },
			{ profilePicture: imgUrl }
		);
		res.status(200).json({ imgUrl });
	} catch (err) {
		next(err);
	}
};

export const uploadClientProfile = async (req, res, next) => {
	try {
		const file = req.file;
		const email = req.params.email;
		const imgUrl = await uploadImg(file, email);

		const updatedClient = await Client.findOneAndUpdate(
			{ email: email },
			{ profilePicture: imgUrl }
		);
		res
			.status(200)
			.json({ messgage: "Success uploading client profile picture to GCS." });
	} catch (err) {
		next(err);
	}
};
