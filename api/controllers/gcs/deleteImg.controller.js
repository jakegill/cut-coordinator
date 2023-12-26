import Barber from "../../models/barber.model.js";
import { deleteImg } from "../../storage/storage.js";

export const deletePortfolio = async (req, res) => {
	const { email } = req.params;
	const { photo } = req.body;
	console.log(photo);
	try {
		// Delete the image from GCS
		await deleteImg(photo);

		// Update the MongoDB document
		const updatedBarber = await Barber.findOneAndUpdate(
			{ email: email },
			{ $pull: { portfolio: photo } },
			{ new: true }
		);
		res.status(200).json({ message: "Image deleted successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};
