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
		location: {
			address: {
				type: String,
				required: false,
			},
			city: {
				type: String,
				required: false,
			},
			state: {
				type: String,
				required: false,
			},
		},
		profilePicture: {
			type: String,
			required: false,
		},
		portfolio: [
			{
				type: String,
				required: false,
			},
		],
		services: [
			{
				service: {
					type: String,
					required: false,
				},
				price: {
					type: String,
					required: false,
				},
			},
		],
		clients: [
			{
				type: String,
				required: false,
			},
		],
		schedule: {
			days: {
				Sunday: { type: Boolean, required: false },
				Monday: { type: Boolean, required: false },
				Tuesday: { type: Boolean, required: false },
				Wednesday: { type: Boolean, required: false },
				Thursday: { type: Boolean, required: false },
				Friday: { type: Boolean, required: false },
				Saturday: { type: Boolean, required: false },
			},
			startTime: {
				type: String,
				required: false,
			},
			endTime: {
				type: String,
				required: false,
			},
		},
		appointments: [
			{
				clientFirstName: {
					type: String,
					required: false,
				},
				clientLastName: {
					type: String,
					required: false,
				},
				clientEmail: {
					type: String,
					required: false,
				},
				service: {
					type: String,
					required: false,
				},
				price: {
					type: String,
					required: false,
				},
				time: {
					type: String,
					required: false,
				},
				date: {
					type: String,
					required: false,
				},
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
