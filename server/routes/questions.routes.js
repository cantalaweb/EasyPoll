const express = require("express");
const router = express.Router();

const { createQuestion , getQuestion } = require("../controllers/question.controller");

router.post("/", createQuestion);
router.get("/:word", getQuestion);

module.exports = router;

