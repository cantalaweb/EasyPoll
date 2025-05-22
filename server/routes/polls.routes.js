const express = require("express");
const router = express.Router();

const { createPoll } = require("../controllers/poll.controller");
const { getPolls } = require("../controllers/poll.controller");
const { updatePolls } = require("../controllers/poll.controller");

router.post("/:questionId", createPoll);
router.get("/:pollId", getPolls);
router.put("/:pollId", updatePolls);

module.exports = router;
