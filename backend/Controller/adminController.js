const User = require("../Model/userSchema");
const upload = require("../Multer/multer");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).sort({ createdAt: -1 });
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
      const hashedPassword = await bcrypt.hash(password, 10);
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

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error getting user id" });
  }
};

const updateUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ message: "Error Uploading file" });
    }
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const profileImage = req.file ? req.file.filename : null;

      const updatedFields = {
        name,
        email,
      };
      if (profileImage) {
        updatedFields.profileImage = profileImage;
      }
      const updatedUser = await User.findByIdAndUpdate(id, updatedFields);

      if (!updatedUser) {
        return res.status(400).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Error updating user by Admin" });
    }
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "User deletion error" });
  }
};

module.exports = {
  getUsers,
  newUser,
  updateUser,
  getUserId,
  deleteUser,
};
