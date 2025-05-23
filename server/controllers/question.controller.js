const { Question } = require("../models/question.model");
const mongoose = require("mongoose")

const createQuestion = async (req, res) => {
    const id = new mongoose.Types.ObjectId()
    const question = req.body.question;
    const minsToVote = req.body.minsToVote;
    const options = req.body.options;
    try {
        const createdQuestion = new Question({
            _id: id,
            question: question,
            minsToVote: minsToVote,
            options: options
        });
        await createdQuestion.save();
        
        // Now send a POST request to /polls/:questionId to create a new poll
        try {
            fetch(`http://127.0.0.1:8000/polls/${id}`, {method: "POST"})
            // .then((response) => console.log(`(${response.status}), Poll ${response.statusText}`))
            .then(response => response.json())
            .then(data => res.status(201).send(data))
            .catch(error => console.log(error));
        } catch (error) {
            res.status(404).send(error);
        }
    } catch (error) {
        res.status(404).send(error);
    }
};
const getQuestions = async (req, res) => {
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

module.exports = { getQuestions , createQuestion };
