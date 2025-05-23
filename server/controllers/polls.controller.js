const { Poll } = require("../models/poll.model");
const mongoose = require("mongoose")
const ip = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])


const createPoll = async (req, res) => {
    const ip = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])
    const id = new mongoose.Types.ObjectId()
    const questionId = req.params.questionId;
    const dateNow = Date.now();
    const url = `http://${ip[0]}:8000/polls/${id}`
    try {
        const createdPoll = new Poll({
            _id: id,
            question: questionId,
            date: dateNow
        });
        await createdPoll.save();
        res.status(201).send(`{ "url": "${url}" }`);
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
