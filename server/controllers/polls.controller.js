//A MODIFICAR TODO

const { Question } = require("../models/question.model");

const createQuestion = async (req, res) => {
    const question = req.body.question;
    const minsToVote = req.body.minsToVote;
    const options = req.body.options;
    const createdAt = Date.now;
    try {
        const createdQuestion = new Question({
            question: question,
            minsToVote: minsToVote,
            options: options,
            createdAt: createdAt,
        });
        await createdQuestion.save();
        res.status(201).send("Question registered.");
    } catch (error) {
        res.status(404).send(error);
    }
};
const getQuestion = async (req, res) => {
    const word = req.params.word;
    const historialdepreguntas = "";
    try {
        const questions = await Question.findAll({});
        questions.forEach((element) => {
            if (element.question.includes(word)) {
                historialdepreguntas =
                    historialdepreguntas +
                    `<h3>${element.question}</h3><button>Seleccionar pregunta</button><br>`;
            }
            res.send(200);
        });
        if (Votes.question.includes(word)) {
            res.status(200).send(Votes.question);
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = { getQuestion };
module.exports = { createQuestion };
