const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    minlength: 8,
  },
});
const joiSchema = Joi.object({
  userName: Joi.string().required().min(5),
  password: Joi.string().required().min(8),
  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords doesn't match" }),
});

const validateUser = function (user) {
  return joiSchema.validate(user);
};

userSchema.methods.createToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT);
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
