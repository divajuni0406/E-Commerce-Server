const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username must not empty"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password must not empty"],
    minLength: [7, "Password must have at least 7 character"],
  },
  email: {
    type: String,
    required: [true, "Email must not empty"],
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} not supported",
    },
    default: "user",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name must not empty"],
  },
  birthdate: {
    type: Date,
    validate: {
      validator: (doc) => new Date(doc).getTime() < Date.now(),
      message: "Birthdate must earlier than today",
    },
  },
  tokenResetPassword: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
