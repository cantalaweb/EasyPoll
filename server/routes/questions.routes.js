const express = require("express");
const router = express.Router();

const { createQuestion } = require("../controllers/question.controller");
const { getQuestions } = require("../controllers/question.controller");

router.post("/", createQuestion);
router.get("/:word", getQuestions);

module.exports = router;

