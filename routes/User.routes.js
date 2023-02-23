const express = require("express");

const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

//R   O   U    T    E    S

//R E G I S T E R
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    res.send("Registered");
  } catch (err) {
    res.send("Registration Error");
    console.log(err);
  }
});

//L O G I N
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user[0].password == password) {
      res.send("Logged In");
    } else {
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send("Login Error");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
