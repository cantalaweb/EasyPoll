const { Question } = require("../models/question.model");
const express = require("express");
const router = express.Router();

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
                    `<h3>${element.question}</h3><button onclick=${router.get("/:"+element._id, getResults)}>Seleccionar pregunta</button><br>`;
            }
        });
        document.getElementById("historial").innerHTML = historialdepreguntas
        res.status (200)
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = { getQuestion , createQuestion };
