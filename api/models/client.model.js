import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
      default: "client",
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    barbers: [
      {
        type: String, //emails
        required: false,
      },
    ],
  },
  { timestamps: true }
);

clientSchema.pre("save", function (next) {
  this.profilePicture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=0b0b09&color=a39d80&bold=true&size=128&rounded=true`;
  next();
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
