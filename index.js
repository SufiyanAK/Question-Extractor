const textFromArea = document.getElementById('question-bank');
const submitBtn = document.querySelector('.submit');
const emptyBtn = document.querySelector('.empty');
const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];

// Demo Value
textFromArea.defaultValue = `Is This Demo Text?\nYes.\nNo\n\nwhen click on submit check console for answer`;

submitBtn.addEventListener('click', () => {
    const lines = textFromArea.value.split('\n');
    let optionCount = 1;
    let currentQuestion = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== '') {
            if (line.endsWith('?')) {
                questionBank.push(currentQuestion);

                currentQuestion['Question'] = line;
            } else {

                if (line.endsWith('.')) {
                    let ans = line.split('.')
                    currentQuestion[`answer`] = ans[0];
                } else {
                    currentQuestion[`option${optionCount}`] = line;
                    optionCount++;
                }
            }
        } else {
            currentQuestion = {}
            optionCount = 1
        }
    }

    localStorage.setItem('questionBank', JSON.stringify(questionBank));
    console.log(questionBank);
});

emptyBtn.addEventListener('click', () => {
    try {
        localStorage.removeItem('questionBank');
        console.log(`Item removed from local storage.\n${JSON.stringify(questionBank)}`);
    } catch (error) {
        console.error('Error removing item from local storage:', error);
    }
});