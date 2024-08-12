const express = require("express");
const router = express.Router();

const controller = require("./controller.js");

router.post("/create", controller.createUser);
router.post("/login", controller.loginUser);
router.post("/refresh_token", controller.refreshAccessTokenController);

module.exports = router;
