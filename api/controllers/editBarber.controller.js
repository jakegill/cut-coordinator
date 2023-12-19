import Barber from "../models/barber.model.js";

export async function editBarber(req, res, next) {
  const { email, location, services, schedule, portfolio } = req.body;
  console.log(req.body);
  console.log(email);
  try {
    const updatedBarber = await Barber.findOneAndUpdate(
      { email: email },
      {
        location: {
          address: location?.address,
          city: location?.city,
          state: location?.state,
        },
        services: services,
        schedule: schedule,
        portfolio: portfolio,
      }
    );
    res.status(200).json({ message: "true", updatedBarber });
  } catch (error) {
    console.error(error);
  }
}
