const bcrypt = require("bcryptjs");
const upload = require("../Multer/multer");
const User = require("../Model/userSchema");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("newuser created:", newUser);
    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error Creating User" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        res.status(201).json({ message: "SignIn successfull", user });
      } else {
        res.status(400).send({ message: "Wrong Password" });
      }
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error Signing In" });
  }
};

const uploadProfileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: "Error Uploading file" });
    }
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      user.profileImage = req.file.filename;
      await user.save();

      res
        .status(200)
        .json({ message: "Profile image uploaded successfully", user });
    } catch (error) {
      res.status(500).send({ error: "Error uploading profile image" });
    }
  });
};
module.exports = {
  signup,
  signin,
  uploadProfileImage,
};
