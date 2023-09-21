const express = require("express");
const controller = require("../controllers/user.controller");
const user = express.Router();

user.get("/", controller.getAllUsers);
user.post("/signup", controller.signup);
user.post("/login", controller.login);

module.exports = user;
