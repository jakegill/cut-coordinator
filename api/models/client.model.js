import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: Buffer, //binary data for img
      required: false,
    },
    barbers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Barber",
      },
    ],
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
