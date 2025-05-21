const mongoose = require("mongoose")
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {type: String, required: true},
    minsToVote: {type: Number, default: 2},
    options: [{
        text: {type: String, required: true},
    }],
    createdAt: { type: Date, default: Date.now },
});
  
const Question = mongoose.model('Question', questionSchema);

module.exports = { Question }
