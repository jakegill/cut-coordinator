import Barber from "../models/barber.model.js";
import Client from "../models/client.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signin(req, res, next) {
  console.log(req.body);
}

export async function signup(req, res, next) {
  console.log(req.body);
}
