import Barber from "../models/barber.model.js";
import Client from "../models/client.model.js";

export default async function createAppointment(req, res, next) {
  const { barberEmail, clientEmail, date, time } = req.body;
  const barberAppointment = {
    clientEmail,
    date,
    time,
  };

  const clientAppointment = {
    barberEmail,
    date,
    time,
  };

  try {
    const addAppointmentBarber = await Barber.findOneAndUpdate(
      {
        email: email,
      },
      { $push: { appointments: barberAppointment } },
      { new: true }
    );

    const addAppointmentClient = await Client.findOneAndUpdate(
      { email: email },
      { $push: { appointments: clientAppointment } },
      { new: true }
    );

    res.status(200).json({ message: updatedBarber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
