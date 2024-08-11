const User = require("../Model/userSchema");
const upload = require("../Multer/multer");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    console.log("user-backend", users);
    res.status(200).json({ message: "User fetched successfully", users });
  } catch (error) {
    res.status(500).send({ error: "Error fetching users" });
  }
};

const newUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: "Error Uploading file" });
    }
    try {
      const { name, email, password } = req.body;
      const profileImage = req.file ? req.file.filename : null;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email Already in use" });
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage,
      });
      await newUser.save();
      res.status(200).json({ message: "user created by admin successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error creating user by admin" });
    }
  });
};


module.exports = {
  getUsers,
  newUser,
};
