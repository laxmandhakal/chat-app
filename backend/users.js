import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, minlength: 5, unique: true },
		password: { type: String, required: true, minlength: 8 },
	},
	{ timestamps: true }
);

export default mongoose.model("users", userSchema);
