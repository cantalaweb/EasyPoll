const express = require("express");
const router = express.Router();

const { getResults } = require("../controllers/results.controller");

router.get("/:pollId", getResults);

module.exports = router;
