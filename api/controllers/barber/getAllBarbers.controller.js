import Barber from "../../models/barber.model.js";

export async function getAllBarbers(req, res, next) {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
