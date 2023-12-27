import Barber from "../../models/barber.model.js";

export async function editBarber(req, res, next) {
	const { email, location, services, schedule, portfolio } = req.body;

	let updateData = {};
	if (location) {
		updateData.location = {
			address: location.address,
			city: location.city,
			state: location.state,
		};
	}
	if (services) {
		updateData.$push = {
			services: {
				service: services.service,
				price: services.price,
			},
		};
	}
	if (schedule) {
		updateData.schedule = {
			days: schedule.days,
			startTime: schedule.startTime,
			endTime: schedule.endTime,
		};
	}
	if (portfolio) {
		updateData.portfolio = portfolio;
	}

	try {
		const updatedBarber = await Barber.findOneAndUpdate(
			{ email: email },
			updateData,
			{ new: true }
		);
		res.status(200).json({ message: "true", updatedBarber });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
}
