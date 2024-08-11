const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");

router.get('/users', adminController.getUsers);
router.post('/newuser',adminController.newUser);

module.exports = router;