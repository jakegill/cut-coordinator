import Barber from "../models/barber.model.js";

export async function getBarber(req, res, next) {
  try {
    const email = req.params.email;
    const barber = await Barber.findOne({ email: email });
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    const { password, ...barberDetails } = barber._doc;
    res.json(barberDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
