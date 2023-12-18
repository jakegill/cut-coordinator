import Barber from "../models/barber.model.js";

export async function editBarber(req, res, next) {
  const { email, address, services, schedule, portfolio } = req.body;
  console.log(req.body);
}
