import Barber from "../../models/barber.model.js";

export async function deleteService(req, res, next) {
	const { email } = req.params;
	const { serviceId } = req.body;

	try {
		const updatedBarber = await Barber.findOneAndUpdate(
			{ email: email },
			{ $pull: { services: { _id: serviceId } } },
			{ new: true }
		);
		res
			.status(200)
			.json({ message: "Service deleted successfully.", updatedBarber });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
}
