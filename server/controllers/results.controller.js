const { Question } = require("../models/question.model");
const { Results } = require("../models/results.model");
/* Tal como esta hecha el modelo resuls no sería necesario, sería necesario si por ejemplo se quisiera comprobar si
un usuario ha votado*/

const getResults = async (req, res) => {
    const idQuestion = req.body._id;

    const resultados = [];
    try {
        const results = await Question.find({ _id: idQuestion });
        const options = results[0].options;
        for (let i = 0; i < options.length; i++) {
            let a = 0;
            for (let j = 0; j < results.length; j++) {
                if (results.options[j] == options[i]) {
                    a++;
                }
            }
            resultados.push(a);
        }
        const ctx = document.getElementById("nobelChart").getContext("2d");
        const nobelChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: options,
                datasets: [
                    {
                        data: resultados,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: question,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const total = context.chart._metasets[0].total;
                                const value = context.parsed;
                                const percentage = (
                                    (value / total) *
                                    100
                                ).toFixed(1);
                                return `${context.label}: ${percentage}%`;
                            },
                        },
                    },
                },
            },
        });
        res.status(201);
    } catch (error) {
        res.status(404).send(error);
    }
};
module.exports = { getResults };
