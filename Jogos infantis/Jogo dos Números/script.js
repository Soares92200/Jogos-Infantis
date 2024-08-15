document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-number');
    const checkButton = document.getElementById('check-answer');
    const numberInput = document.getElementById('number-input');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    
    let currentNumber = 0;
    let score = 0;

    function getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1; // Gera um número entre 1 e 10
    }

    //function playNumberAudio(number) {
    //const audio = new Audio(`https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&q=${number}&client=tw-ob`);
    //    audio.play();
    //}

    function playNumberAudio(number) {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        utterance.lang = 'pt-BR'; // Define a linguagem para português brasileiro
        speechSynthesis.speak(utterance);
    }



    function generateNewNumber() {
        currentNumber = getRandomNumber();
    }

    playButton.addEventListener('click', () => {
        if (currentNumber === 0) {
            generateNewNumber();
        }
        playNumberAudio(currentNumber);
    });

    checkButton.addEventListener('click', () => {
        const userAnswer = parseInt(numberInput.value, 10);
        if (userAnswer === currentNumber) {
            feedback.textContent = 'Correto! Parabéns!';
            feedback.style.color = 'green';
            score++;
            scoreDisplay.textContent = score;
            generateNewNumber(); // Gera um novo número após a resposta correta
        } else {
            feedback.textContent = 'Tente novamente!';
            feedback.style.color = 'red';
        }
        numberInput.value = '';
    });
});
