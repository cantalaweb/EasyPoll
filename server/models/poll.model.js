const mongoose = require("mongoose")
const { Schema } = mongoose;

const pollSchema = new Schema({
    poll: {
        _id: Schema.Types.ObjectId,
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        date: { type: Date, default: Date.now() },
        users: [{
            userName: {type: String, required: true},
            userIP: {type: String, required: true},
            chosenOption: {type: String, required: true}
        }]
    }
});
  
const Poll = mongoose.model('Poll', pollSchema);

module.exports = { Poll }
