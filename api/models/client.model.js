import mongoose from "mongoose";

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
      unqiue: true,
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

const Client = mongoose.model("Client", userSchema);

export default Client;
