const express = require("express");
const router = express.Router();

const { createPoll } = require("../controllers/polls.controller");
const { getPolls } = require("../controllers/polls.controller");
const { updatePolls } = require("../controllers/polls.controller");

router.post("/:questionId", createPoll);
router.get("/:pollId", getPolls);
router.put("/:pollId", updatePolls);

module.exports = router;
