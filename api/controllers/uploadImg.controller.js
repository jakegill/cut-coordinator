import { uploadImg } from "../storage/storage.js";
import Barber from "../models/barber.model.js";

export const uploadImgGCSPortfolio = async (req, res, next) => {
  try {
    //GCS
    const file = req.file;
    const email = req.params.email;
    const imgUrl = await uploadImg(file, email);

    //MongoDB
    const updatedBarber = await Barber.findOneAndUpdate(
      { email: email },
      { $push: { portfolio: imgUrl } }
    );

    res.status(200).json({ imgUrl });
  } catch (err) {
    next(err);
  }
};

export const uploadImgGCSProfile = async (req, res, next) => {
  try {
    const file = req.file;
    const email = req.params.email;
    const imgUrl = await uploadImg(file, email);

    const updatedBarber = await Barber.findOneAndUpdate(
      { email: email },
      { profilePicture: imgUrl }
    );
    res.status(200).json({ imgUrl });
  } catch (err) {
    next(err);
  }
};
