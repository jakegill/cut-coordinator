import Client from "../../models/barber.model.js";

export async function getBarber(req, res, next) {
  try {
    const email = req.params.email;
    const client = await Client.findOne({ email: email });
    if (!barber) {
      return res.status(404).json({ message: "Client not found" });
    }
    const { password, ...clientDetails } = barber._doc;
    res.json(clientDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
