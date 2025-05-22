//A MODIFICAR TODO

const { Poll } = require("../models/poll.model");

const createPoll = async (req, res) => {
    const questionId = req.params.questionId;
    const dateNow = Date.now;
    try {
        const createdPoll = new Poll({
            questionId: questionId,
            date: dateNow
        });
        await createdPoll.save();
        res.status(201).send("Poll registered.");
    } catch (error) {
        res.status(404).send(error);
    }
};

const getPoll = async (req, res) => {
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

const updatePoll = async (req, res) => {
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

 
module.exports = { createPoll, getPoll, updatePoll };
