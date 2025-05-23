const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = Schema({
    _id: Schema.Types.ObjectId,
    question: { type: String, required: true },
    minsToVote: { type: Number, default: 2 },
    options: [{ type: String, required: true }]
});

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question };
