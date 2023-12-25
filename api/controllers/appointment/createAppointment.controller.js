import Barber from "../../models/barber.model.js";
import Client from "../../models/client.model.js";

export default async function createAppointment(req, res, next) {
	const { barberEmail, clientEmail, date, time, service } = req.body;
	const barberAppointment = {
		clientEmail,
		date,
		time,
		service,
	};

	const clientAppointment = {
		barberEmail,
		date,
		time,
		service,
	};

	console.log("b", barberAppointment, "c", clientAppointment);

	try {
		const addAppointmentBarber = await Barber.findOneAndUpdate(
			{
				email: barberEmail,
			},
			{
				$push: { appointments: barberAppointment },
				$addToSet: { clients: clientEmail },
			},
			{ new: true }
		);

		const addAppointmentClient = await Client.findOneAndUpdate(
			{ email: clientEmail },
			{
				$push: { appointments: clientAppointment },
				$addToSet: { barbers: barberEmail },
			},
			{ new: true }
		);

		res.status(200).json({
			message: "Success creating appointments.",
			addAppointmentBarber,
			addAppointmentClient,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
