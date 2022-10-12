const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter your name"],
		maxLength: [30, "Name can not exceed 30 characters"],
		minLength: [4, "Name should have more than 5 characters"],
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validator.isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minLength: [8, "Password must be at least 8 characters"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTTokens = function () {
	return jwt.sign({ id: this._id }, "nadfvcnsdcsvsdjvjsd", {
		expiresIn: process.env.EXPIRE_KEY,
	});
};

//Compare Passwoord
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);