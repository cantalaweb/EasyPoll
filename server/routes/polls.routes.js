const express = require("express");
const router = express.Router();

const { createPoll , getPoll , updatePoll} = require("../controllers/polls.controller");

router.post("/:questionId", createPoll);
router.get("/:pollId", getPoll);
router.put("/:pollId", updatePoll);

module.exports = router;
