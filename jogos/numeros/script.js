document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-number');
    const numberInput = document.getElementById('number-input');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const numberButtonsContainer = document.getElementById('number-buttons');
    const difficultySelect = document.getElementById('difficulty');
    
    let currentNumber = '';
    let score = 0;
    let maxNumber = 9;

    // Verifica se o usuário está em um dispositivo Android
    const isAndroid = /Android/i.test(navigator.userAgent);

    function setDifficulty(level) {
        switch (level) {
            case 'easy':
                maxNumber = 9;
                numberButtonsContainer.style.display = 'block';
                generateNumberButtons(maxNumber);
                break;
            case 'medium':
                maxNumber = 99;
                numberButtonsContainer.style.display = 'none';
                break;
            case 'hard':
                maxNumber = 999;
                numberButtonsContainer.style.display = 'none';
                break;
        }
    }

    function generateNumberButtons(maxNum) {
        numberButtonsContainer.innerHTML = '';
        for (let i = 0; i <= maxNum; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                checkAnswer(i.toString());
            });
            numberButtonsContainer.appendChild(button);
        }
    }

    function getRandomNumber(maxNum) {
        return Math.floor(Math.random() * (maxNum + 1));
    }

    function playNumberAudio(number) {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'pt-BR';
        speechSynthesis.speak(utterance);
    }

    function generateNewNumber() {
        currentNumber = getRandomNumber(maxNumber).toString();
        setTimeout(() => {
            playNumberAudio(currentNumber);
        }, 500);
    }

    function checkAnswer(answer) {
        if (answer === currentNumber) {
            feedback.textContent = 'Correto! Parabéns!';
            feedback.style.color = 'green';
            score++;
            scoreDisplay.textContent = score;
            setTimeout(() => {
                generateNewNumber();
            }, 500);
        } else {
            feedback.textContent = 'Tente novamente!';
            feedback.style.color = 'red';
        }
        numberInput.value = '';
        handleFocus();
    }

    function handleFocus() {
        if (!(isAndroid && numberButtonsContainer.style.display !== 'none')) {
            numberInput.focus();
        }
    }

    playButton.addEventListener('click', () => {
        if (currentNumber === '') {
            generateNewNumber();
        } else {
            playNumberAudio(currentNumber);
        }
        handleFocus();
    });

    numberInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(numberInput.value);
        }
    });

    difficultySelect.addEventListener('change', (event) => {
        setDifficulty(event.target.value);
        startGame();
    });

    function startGame() {
        generateNewNumber();
        setTimeout(() => {
            playNumberAudio(currentNumber);
            handleFocus();
        }, 500);
    }

    setDifficulty(difficultySelect.value);
    startGame();

    numberInput.focus();
});
