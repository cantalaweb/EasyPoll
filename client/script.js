// Get DOM elements
const BASEURL = 'http://127.0.0.1:8000'
const createPollBtn = document.getElementById('createPollBtn');

createPollBtn.addEventListener('click', createPoll)

const createPoll = async () => {
    const questionText = document.getElementById('questionText');
    const minsToVoteText = document.getElementById('minsToVoteText');
    const option1 = document.getElementById('option_1');
    const option2 = document.getElementById('option_2');
    const option3 = document.getElementById('option_3');
    const option4 = document.getElementById('option_4');
    const response = await fetch(BASEURL + "/questions", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            question: questionText.value,
            minsToVote: Number(minsToVoteText.value),
            options: [
                option1.value,
                option2.value,
                option3.value,
                option4.value
            ],
        }),
    })    
    try {
        const newId = await response.json()
        questionText.value = ""
        minsToVoteText.value = "2"
        option1.value = ""
        option2.value = ""
        option3.value = ""
        option4.value = ""
    } catch (error) {
        console.error(error);
        window.alert('Question could not be created.')
    }
}
