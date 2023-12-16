import mongoose from "mongoose";
const Schema = mongoose.Schema;

const barberSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
      default: "barber",
    },
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
      type: String,
      required: false,
    },
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

barberSchema.pre("save", function (next) {
  this.profilePicture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=0b0b09&color=a39d80&bold=true&size=128&rounded=true`;
  next();
});

const Barber = mongoose.model("Barber", barberSchema);

export default Barber;
