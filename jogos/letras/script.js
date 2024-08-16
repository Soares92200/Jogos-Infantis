document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-letter');
    const letterInput = document.getElementById('letter-input');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const letterButtonsContainer = document.getElementById('letter-buttons');
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentLetter = '';
    let score = 0;

    // Verifica se o usuário está em um dispositivo Android
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Função para gerar os botões das letras
    function generateLetterButtons() {
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => {
                checkAnswer(letter);
            });
            letterButtonsContainer.appendChild(button);
        });
    }

    // Função para obter uma letra aleatória
    function getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    }

    // Função para tocar o áudio da letra
    function playLetterAudio(letter) {
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = 'pt-BR';
        speechSynthesis.speak(utterance);
    }

    // Função para gerar uma nova letra
    function generateNewLetter() {
        currentLetter = getRandomLetter();
    }

    // Mantém o foco na área de texto, exceto em Android com botões visíveis
    function handleFocus() {
        if (!(isAndroid && letterButtonsContainer.style.display !== 'none')) {
            letterInput.focus();
        }
    }

    // Função para verificar a resposta (usada tanto pelo botão quanto pelo input)
    function checkAnswer(answer) {
        const userAnswer = answer.toUpperCase();
        if (userAnswer === currentLetter) {
            feedback.textContent = 'Correto! Parabéns!';
            feedback.style.color = 'green';
            score++;
            scoreDisplay.textContent = score;
            setTimeout(() => {  // Aguarda 0,5 segundos antes de gerar e pronunciar a nova letra
                generateNewLetter();
                playLetterAudio(currentLetter);
            }, 500);
        } else {
            feedback.textContent = 'Tente novamente!';
            feedback.style.color = 'red';
        }
        letterInput.value = ''; // Limpa o campo de texto
        //letterInput.focus();    // Mantém o foco no campo de texto
    }

    // Evento para tocar o áudio ao clicar em "Reproduzir Letra"
    playButton.addEventListener('click', () => {
        if (currentLetter === '') {
            generateNewLetter();
        }
        playLetterAudio(currentLetter);
        letterInput.focus(); // Foca no campo de texto após tocar o áudio
    });

    // Evento para verificar a resposta ao pressionar "Enter"
    letterInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(letterInput.value);
        }
    });

    // Gera os botões das letras ao carregar a página
    generateLetterButtons();

    // Função para iniciar o jogo com a primeira letra
    function startGame() {
        generateNewLetter();
        setTimeout(() => {
            playLetterAudio(currentLetter);
        }, 500); // Aguarda 0,5 segundos antes de reproduzir a letra inicial
    }

    // Inicia o jogo ao carregar a página
    startGame();

    // Foca no campo de texto ao carregar a página
    letterInput.focus();
});
