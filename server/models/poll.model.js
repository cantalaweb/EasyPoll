const mongoose = require("mongoose")
const { Schema } = mongoose;

const pollSchema = Schema({
    _id: Schema.Types.ObjectId,
    question: {type: Schema.Types.ObjectId, required: true, ref: 'Question'},
    date: { type: Date, default: Date.now() },
    users: [{
        userName: {type: String, required: true},
        userIP: {type: String, required: true},
        chosenOption: {type: String, required: true}
    }]
});
  
const Poll = mongoose.model('Poll', pollSchema);

module.exports = { Poll }
