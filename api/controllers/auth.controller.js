import Barber from "../models/barber.model.js";
import Client from "../models/client.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const findBarber = await Barber.findOne({ email: email });
    const findClient = await Client.findOne({ email: email });
    if (!findBarber && !findClient) {
      return next(console.log(401, "User not found."));
    }

    if (findBarber) {
      const validPassword = bcryptjs.compareSync(password, findBarber.password);
      if (validPassword) {
        const token = jwt.sign({ id: findBarber._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...userWithoutPassword } =
          findBarber._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 365),
          })
          .status(200)
          .json(userWithoutPassword);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (findClient) {
      const validPassword = bcryptjs.compareSync(password, findClient.password);
      if (validPassword) {
        const token = jwt.sign({ id: findClient._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...userWithoutPassword } =
          findClient._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 365),
          })
          .status(200)
          .json(userWithoutPassword);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    next(err);
  }
}

export async function signup(req, res, next) {
  const { firstName, lastName, email, password, accountType } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 12);

  try {
    if (accountType === "client") {
      const user = new Client({
        firstName,
        lastName,
        email,
        accountType,
        password: hashedPassword,
      });
      await user.save();
    } else if (accountType === "barber") {
      const user = new Barber({
        firstName,
        lastName,
        email,
        accountType,
        password: hashedPassword,
      });
      await user.save();
    }
    res.status(201).json({ message: `${accountType} created successfully` });
    res.redirect("/signin");
  } catch (err) {
    next(err);
  }
}
