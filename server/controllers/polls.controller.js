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
    const ip = Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])
    const url = `http://${ip[0]}:8000`
    const pollId = req.params.pollId
    try {
        const poll = await Poll.findById(pollId).
        populate('question').
        exec();
        let array_options = 'const options = ['
        poll.question.options.forEach(option => {
            array_options += `"${option}",`
        })
        array_options.slice(0, -1) // para quitar la última coma
        array_options += ']'

        // Set how many minutes to subtract
        const countdownMinutes = poll.question.minsToVote

        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Today's poll</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; }
                    h1 { color: #333; }
                    .container {
                        display: flex;
                        flex-direction: column;
                        gap: 10px; /* Space between buttons */
                        align-items: center;
                    }
                </style>
            </head>
            <body>
                <h2>${poll.question.question}</h2>
                <br/>
                <div class="container" id="options">
                </div>
                <div class="container" id="timer">
                </div>
            </body>
            <script>
                let userIP = ''
                // Now send a GET request to /get-ip/ to get the IP address of the user
                try {
                    fetch("${url}/get-ip", {method: "GET"})
                    .then(response => response.json())
                    .then(data => userIP = data.ip)
                    .catch(error => console.log(error));
                } catch (error) {
                    res.status(404).send(error);
                }
                const userName = prompt("Please enter your name", "John Doe");
                const container = document.getElementById('options');

                // Now send a GET request to /get-ip/ to get the IP address of the user
                try {
                    fetch("${url}/get-ip", {method: "GET"})
                    .then(response => response.json())
                    .then(data => userIP = data.ip)
                    .catch(error => console.log(error));
                } catch (error) {
                    res.status(404).send(error);
                }

                function createClickableElements() {
                    ${array_options}
                    options.forEach(option => {
                        if (option != '') {
                            const button = document.createElement('button');
                            button.textContent = option;
                            button.addEventListener('click', () => {
                                const url = "${url}/polls/${pollId}"
                                // Send PUT request
                                fetch(url, {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                        userIP: userIP,
                                        userName: userName,
                                        chosenOption: option
                                    })
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error("HTTP error! status: " + response.status);
                                    }
                                    return response.json()
                                })
                                .then(data => {
                                    // Update UI to show success
                                    button.disabled = true
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                            })
                            
                            // Styling
                            button.style.margin = '5px';
                            button.classList.add('btn');
                            button.id = option
                            container.appendChild(button);
                        }
                    })
                }

                // Run when DOM is loaded
                document.addEventListener('DOMContentLoaded', createClickableElements)
                
                const endTime = new Date().getTime() + ${countdownMinutes} * 60 * 1000;

                function updateTimer() {
                    const now = new Date().getTime();
                    const timeLeft = endTime - now;

                    const timerDiv = document.getElementById("timer");

                    if (timeLeft <= 0) {
                    timerDiv.textContent = "00:00:00";
                    clearInterval(timerInterval);
                    return;
                    }

                    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    timerDiv.textContent =
                    String(hours).padStart(2, "0") + ":" +
                    String(minutes).padStart(2, "0") + ":" +
                    String(seconds).padStart(2, "0");
                }

                const timerInterval = setInterval(updateTimer, 1000);
                updateTimer(); // Call once immediately

                </script>
            </html>
        `;
        
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        console.error('Error:', err)
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
