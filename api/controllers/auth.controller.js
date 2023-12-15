import Barber from "../models/barber.model.js";
import Client from "../models/client.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signin(req, res, next) {
  console.log(req.body);
}

export async function signup(req, res, next) {
  console.log(req.body);
  const { firstName, lastName, email, password, accountType } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);

  try {
    if (accountType === "client") {
      const user = new Client({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
    } else if (accountType === "barber") {
      const user = new Barber({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
    }
    res.status(201).json({ message: `${accountType} created successfully` });
  } catch (err) {
    next(err);
  }
}
