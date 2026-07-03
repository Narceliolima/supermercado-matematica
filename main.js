const phases = [
  { item: 'Maçã Pixelada', price: 3.5, paid: 5.0 },
  { item: 'Leite Quadrado', price: 4.25, paid: 10.0 },
  { item: 'Pão de Forma 8-bit', price: 6.8, paid: 10.0 },
  { item: 'Refrigerante Retrô', price: 7.15, paid: 20.0 },
  { item: 'Salgadinho de Bacon', price: 12.4, paid: 20.0 },
  { item: 'Cereal Gamer', price: 18.9, paid: 50.0 },
  { item: 'Chocolate em Barra', price: 5.35, paid: 20.0 },
  { item: 'Café Ultra Forte', price: 22.15, paid: 50.0 },
  { item: 'Biscoito Lendário', price: 3.62, paid: 5.0 },
  { item: 'Bolo de Aniversário', price: 45.75, paid: 100.0 },
];

let currentPhase = 0;
let score = 0;

const phaseDisplay = document.getElementById('phase-display');
const scoreDisplay = document.getElementById('score-display');
const itemName = document.getElementById('item-name');
const totalPrice = document.getElementById('total-price');
const moneyPaid = document.getElementById('money-paid');
const playerInput = document.getElementById('player-input');
const btnSubmit = document.getElementById('btn-submit');
const feedbackMsg = document.getElementById('feedback-msg');

function loadPhase() {
  if (currentPhase >= phases.length) {
    endGame();
    return;
  }

  const data = phases[currentPhase];
  phaseDisplay.textContent = `FASE: ${currentPhase + 1}/${phases.length}`;
  itemName.textContent = `Item: ${data.item}`;
  totalPrice.textContent = `Total: R$ ${data.price.toFixed(2)}`;
  moneyPaid.textContent = `Pago: R$ ${data.paid.toFixed(2)}`;
  playerInput.value = '';
  feedbackMsg.textContent = '';
  playerInput.focus();
}

function checkAnswer() {
  if (currentPhase >= phases.length) return;

  const data = phases[currentPhase];
  const correctAnswer = (data.paid - data.price).toFixed(2);
  const playerAnswer = parseFloat(playerInput.value).toFixed(2);

  if (playerAnswer === correctAnswer) {
    score += 100;
    scoreDisplay.textContent = `PONTOS: ${score}`;
    feedbackMsg.textContent = 'CORRETO! +100 PTS';
    feedbackMsg.className = 'feedback success';

    currentPhase++;
    setTimeout(loadPhase, 1500); // Avança após 1.5 segundos
  } else {
    feedbackMsg.textContent = 'TROCO INCORRETO! TENTE DE NOVO.';
    feedbackMsg.className = 'feedback error';
    playerInput.focus();
  }
}

function endGame() {
  document.getElementById('game-container').innerHTML = `
            <div class="header">FIM DE JOGO!</div>
            <div class="screen" style="font-size: 16px;">
                PARABÉNS!<br><br>
                VOCÊ FECHOU O CAIXA COMPLETO.<br><br>
                PONTUAÇÃO FINAL:<br>
                <span style="color: #ff0054;">${score} PONTOS</span>
            </div>
            <button onclick="window.location.reload()">JOGAR DE NOVO</button>
        `;
}

// Eventos
btnSubmit.addEventListener('click', checkAnswer);
playerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAnswer();
});

// Inicializa o jogo
loadPhase();
