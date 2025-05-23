const express = require("express");
const router = express.Router();

const { getIP } = require("../controllers/ip.controller");

router.get("/", getIP);

module.exports = router;
