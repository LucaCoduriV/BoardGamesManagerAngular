const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");

//TODO public route
router.get("/getUsers", userCtrl.getUsers);

//TODO private route

module.exports = router;
