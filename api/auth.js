const router = require("express").Router();
const User = require("../models/User");
const FollowStats = require("../models/FollowStats");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../middlewares/validation");
const bcrypt = require("bcryptjs");
const verify = require("../middlewares/verifyToken");
const Notification = require("../models/Notification");
const Profile = require("../models/Profile");

//get user data on initial load

router.get("/", verify, async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    const userFollowStats = await FollowStats.findOne({ user: userId });
    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//register new user

router.post("/register", async (req, res) => {
  //validating
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email already exists
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.status(400).send("User already exist, Sign In");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    profilePicUrl: req.body.profilePicUrl
  });
  
  try {
    const savedUser = await user.save();
    await new FollowStats({ user: savedUser._id, followers: [], following: [] }).save();
    await new Notification({ user: savedUser._id, notifications: [] }).save();
    await new Profile({user: savedUser._id}).save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, { expiresIn: "3d" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check email
  const user = await User.findOne({ username: req.body.username }).select("+password");
  if (!user) return res.status(400).send("User is not found, Sign Up instead");

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  console.log("validdd passs", validPass);


  //create and assign a token
  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "3d" });
    res.status(200).json(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
