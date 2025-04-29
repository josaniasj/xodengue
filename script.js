
document.addEventListener("DOMContentLoaded", () => {
  const perguntas = [
    {
      pergunta: "Qual mosquito transmite a dengue?",
      opcoes: ["Culex", "Anopheles", "Aedes aegypti", "Pernilongo"],
      correta: 2
    },
    {
      pergunta: "Qual desses é um foco de dengue?",
      opcoes: ["Pneu com água", "Piscina tratada", "Copo seco", "Garrafa tampada"],
      correta: 0
    },
    {
      pergunta: "Qual não é um sintoma da dengue?",
      opcoes: ["Febre", "Dor no corpo", "Visão turva", "Manchas vermelhas"],
      correta: 2
    },
    {
      pergunta: "Qual atitude ajuda na prevenção?",
      opcoes: ["Guardar garrafas com a boca para cima", "Deixar água em vasos de planta", "Tirar a água dos pratos de vasos", "Armazenar pneus abertos"],
      correta: 2
    },
    {
      pergunta: "Em qual estação os casos aumentam?",
      opcoes: ["Inverno", "Primavera", "Verão", "Outono"],
      correta: 2
    }
  ];

  let etapa = 0;
  let pontuacao = 0;

  const container = document.getElementById("quizContainer");
  const resultado = document.getElementById("resultadoQuiz");

  function mostrarPergunta() {
    if (etapa < perguntas.length) {
      const q = perguntas[etapa];
      let html = `<h2>${q.pergunta}</h2>`;
      q.opcoes.forEach((opcao, i) => {
        html += `<button onclick="responder(${i})">${opcao}</button><br>`;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = "<h2>Quiz finalizado!</h2>";
      resultado.textContent = `Sua pontuação: ${pontuacao * 20} de 100`;
    }
  }

  window.responder = (resposta) => {
    if (resposta === perguntas[etapa].correta) pontuacao++;
    etapa++;
    mostrarPergunta();
  };

  if (container) mostrarPergunta();

  // Contador animado
  const contadorEl = document.getElementById("contador");
  if (contadorEl) {
    let contador = 0;
    document.getElementById("btnContador").addEventListener("click", () => {
      contador++;
      let atual = 0;
      const animar = setInterval(() => {
        if (atual < contador) {
          atual++;
          contadorEl.innerText = atual;
        } else {
          clearInterval(animar);
        }
      }, 20);
    });
  }
});

const board = document.getElementById('board');
const questionOverlay = document.getElementById('questionOverlay');
const questionText = document.getElementById('questionText');
const answersDiv = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const recordElement = document.getElementById('record');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

let score = 0;
let record = localStorage.getItem('dengueRecord') || 0;
recordElement.textContent = record;

const questions = [
  {
    question: "Qual mosquito transmite a dengue?",
    options: ["Culex", "Aedes aegypti", "Anopheles", "Pernilongo"],
    correct: 1,
    points: 10
  },
  {
    question: "A água limpa parada é um risco para o mosquito da dengue?",
    options: ["Não", "Sim", "Só na chuva", "Depende do lugar"],
    correct: 1,
    points: 8
  },
  {
    question: "Qual destes é um sintoma da dengue?",
    options: ["Tosse", "Febre alta", "Dor de ouvido", "Manchas verdes na pele"],
    correct: 1,
    points: 7
  },
  {
    question: "Como evitar a proliferação do mosquito da dengue?",
    options: ["Plantar árvores", "Eliminar água parada", "Usar perfume", "Acender velas"],
    correct: 1,
    points: 10
  },
  {
    question: "A dengue é transmitida diretamente de pessoa para pessoa?",
    options: ["Sim", "Não", "Somente em hospitais", "Somente crianças"],
    correct: 1,
    points: 6
  },
  {
    question: "Principal local de reprodução do Aedes aegypti:",
    options: ["Água corrente", "Água parada", "Terra úmida", "Folhas secas"],
    correct: 1,
    points: 7
  },
  {
    question: "O mosquito da dengue pica preferencialmente:",
    options: ["De dia", "De noite", "Somente ao amanhecer", "Somente à noite"],
    correct: 0,
    points: 5
  },
  {
    question: "Vacina contra a dengue existe?",
    options: ["Sim", "Não", "Só para idosos", "Só para crianças"],
    correct: 0,
    points: 8
  },
  {
    question: "A dengue pode evoluir para formas graves?",
    options: ["Nunca", "Sim", "Só idosos", "Só crianças"],
    correct: 1,
    points: 10
  },
  {
    question: "Um dos sinais de alerta para dengue grave é:",
    options: ["Febre baixa", "Dor abdominal intensa", "Coceira leve", "Espirros"],
    correct: 1,
    points: 9
  },
  {
    question: "O mosquito Aedes aegypti também pode transmitir:",
    options: ["Febre amarela", "Zika", "Chikungunya", "Todas as anteriores"],
    correct: 3,
    points: 12
  },
  {
    question: "Evitar lixo acumulado é importante?",
    options: ["Não", "Sim", "Só em dias de chuva", "Só no verão"],
    correct: 1,
    points: 6
  },
  {
    question: "A melhor maneira de combater o mosquito é:",
    options: ["Tomar remédio", "Eliminar criadouros", "Usar perfume", "Dormir cedo"],
    correct: 1,
    points: 9
  },
  {
    question: "O que fazer ao ter sintomas de dengue?",
    options: ["Tomar remédio sem receita", "Ir ao médico", "Ficar em casa sem beber água", "Viajar"],
    correct: 1,
    points: 8
  },
  {
    question: "A dengue pode ser prevenida com:",
    options: ["Eliminação de água parada", "Campanhas de conscientização", "Uso de repelentes", "Todas as alternativas"],
    correct: 3,
    points: 15
  },
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = i + 1;
    cell.addEventListener('click', () => showQuestion(i));
    board.appendChild(cell);
  }
}

function showQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;
  answersDiv.innerHTML = '';

  q.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(btn, i, q.correct, q.points, index));
    answersDiv.appendChild(btn);
  });

  questionOverlay.classList.remove('hidden');
}

function selectAnswer(button, selected, correct, points, index) {
  const buttons = document.querySelectorAll('.answers button');
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add('correct');
    correctSound.play();
    score += points;
    scoreElement.textContent = score;
    markCellCompleted(index);
  } else {
    button.classList.add('wrong');
    wrongSound.play();
  }

  setTimeout(() => {
    questionOverlay.classList.add('hidden');
    if (score > record) {
      localStorage.setItem('dengueRecord', score);
      recordElement.textContent = score;
    }
  }, 1200);
}

function markCellCompleted(index) {
  const cell = board.children[index];
  cell.classList.add('completed');
}

createBoard();