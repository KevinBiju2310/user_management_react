const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");

router.get('/users', adminController.getUsers);
router.post('/newuser',adminController.newUser);
router.get('/user/:id',adminController.getUserId);
router.put('/user/:id',adminController.updateUser);
router.delete('/user/:id',adminController.deleteUser);

module.exports = router;