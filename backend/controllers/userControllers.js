const { User, validateUser } = require("../models/userModel");
const lodash = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async function (req, res) {
  const user = req.body;
  const isValid = validateUser(user);
  if (isValid.error) {
    return res.status(400).json({ error: isValid.error.details[0].message });
  }
  const userRegistered = await User.findOne({ userName: req.body.userName });
  if (userRegistered)
    return res.status(409).json({
      status: "error",
      error: "Username is taken please choose a another one",
    });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...lodash.pick(user, "userName", "password"),
      password: hashedPassword,
    });
    await newUser.save();
    const token = newUser.createToken();
    res.status(201).json({ data: lodash.omit(newUser, "password"), token });
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

exports.Login = async function (req, res) {
  const userInput = req.body;
  const user = await User.findOne({ userName: userInput.userName });
  if (!user) return res.status(404).json({ error: "Invalid creadentials" });
  const passwordIsValid = bcrypt.compare(req.body.password, user.password);
  if (!passwordIsValid)
    return res.status(404).json({ error: "Invalid creadentials" });
  const token = user.createToken();
  res.status(200).json({ token });
};
