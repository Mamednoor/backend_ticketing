const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 150,
  },
  phone: {
    type: Number,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 150,
    required: true,
  },
  refreshToken: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedOn: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};