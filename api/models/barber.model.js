import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
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
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client", // Assuming your client model is named 'Client'
      },
    ],
  },
  { timestamps: true }
);

const Barber = mongoose.model("Barber", userSchema);

export default Barber;
