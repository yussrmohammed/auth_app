const usersController = require('../controller/user.controller')

const express = require("express");
const router = express.Router();
router.post('/register', usersController.register)
router.post("/login", usersController.login);
router.get("/userprofile", usersController.userProfile);

module.exports=router