import Client from "../../models/client.model.js";

export async function deleteSavedBarber(req, res, next) {
	const { email } = req.params;
	const { barberEmail } = req.body;
	try {
		const updatedClient = await Client.findOneAndUpdate(
			{ email: email },
			{ $pull: { barbers: barberEmail } },
			{ new: true }
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
}
