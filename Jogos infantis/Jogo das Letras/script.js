document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-letter');
    const checkButton = document.getElementById('check-answer');
    const letterInput = document.getElementById('letter-input');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentLetter = '';
    let score = 0;

    function getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    }

    function playLetterAudio(letter) {
        const audio = new Audio("https://translate.google.com/translate_tts?ie=UTF-8&tl=pt-BR&q=${letter}&client=tw-ob");
        audio.play();
    }

    function generateNewLetter() {
        currentLetter = getRandomLetter();
    }

    playButton.addEventListener('click', () => {
        if (currentLetter === '') {
            generateNewLetter();
        }
        playLetterAudio(currentLetter);
    });

    checkButton.addEventListener('click', () => {
        const userAnswer = letterInput.value.toUpperCase();
        if (userAnswer === currentLetter) {
            feedback.textContent = 'Correto! Parabéns!';
            feedback.style.color = 'green';
            score++;
            scoreDisplay.textContent = score;
            generateNewLetter(); // Gera uma nova letra após a resposta correta
        } else {
            feedback.textContent = 'Tente novamente!';
            feedback.style.color = 'red';
        }
        letterInput.value = '';
    });
});
