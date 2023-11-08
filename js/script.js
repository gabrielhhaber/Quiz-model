let questions=[
	{
		text: "A dengue é causada por um vírus transmitido por mosquitos.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "A única maneira de contrair dengue é ser picado por um mosquito infectado.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "A dengue pode ser transmitida de pessoa para pessoa.",
		answers: "true-false",
		correct: 2
	},
	{
		text: "Não existe vacina disponível para prevenir a dengue.",
		answers: "true-false",
		correct: 2
	},
	{
		text: "A dengue é mais comum em áreas tropicais e subtropicais.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "Os sintomas comuns da dengue incluem febre alta, dor de cabeça e erupções cutâneas.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "A dengue é uma doença endêmica, o que significa que está sempre presente em determinadas regiões.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "A dengue é uma doença bacteriana.",
		answers: "true-false",
		correct: 2
	},
	{
		text: "10.	A dengue pode levar à morte em casos graves.",
		answers: "true-false",
		correct: 1
	},
	{
		text: "Qual é o principal vetor da dengue?",
		answers: ["Anofeles", "Aedes Aegypti", "Mosca", "Culex", "Aedes albopictus"],
		correct: 2
	},
	{
		text: "Quais são os sintomas comuns da dengue?",
		answers: ["Febre alta, dor de cabeça, dor muscular, erupção cutânea", "Tosse persistente, dificuldade respiratória, febre moderada", "Dor de estômago, náuseas, tontura, olhos vermelhos", "Dor nas articulações, garganta inflamada, nariz entupido, fadiga"],
		correct: 1
	},
	{
		text: "Qual é o período de incubação da dengue após a picada do mosquito infectado?",
		answers: ["De 2 a 5 dias", "De uma a duas semanas", "De 3 a 4 semanas", "1 mês"],
		correct: 1
	},
];
let currentQuestion=0;
let score=0;
let questionEl=document.querySelector(".question");
let messageDiv=document.getElementById("question-message");
let nextButton=document.getElementById("next-question-btn");
let finishDiv=document.getElementById("end-game-container");
let finishButton=document.getElementById("end-game-btn");
function showQuestion(question) {
	let questionPos=questions.indexOf(question)+1;
	let questionsNumber=questions.length;
	questionEl.setAttribute("id", "question-"+questionPos);
	let questionBody=`
		<h2 id="question-number" tabindex="-1">${questionPos}/${questionsNumber}</h2>
		<p class="question-text">${question.text}</p>
		<ul class="answers-list">
	`;
	let answersIsArray=isArray(question.answers);
	if(answersIsArray) {
		question.answers.forEach((answer, index) => {
			questionBody+=`
				<li class="answer ${answerClass}" id="answer-${answerPos}">
					<button class="answer-btn">${answer}</button>
				</li>
				<li class="answer-2" id="answer-false">
					<button class="answer-btn">${answer}</button>
				</li>
			`;
		});
	}
	else if(answers==="true-false") {
			questionBody+=`
				<li class="answer" id="answer-${answerPos}">
					<button class="answer-btn">${answer}</button>
				</li>
			`;
	}
		}
	});
	questionBody+=`
		</ul>
	`;
	questionEl.innerHTML=questionBody;
	let answerButtons=questionEl.querySelectorAll("button.answer-btn");
	answerButtons.forEach((answerButton) => {
		answerButton.addEventListener("click", (evt) => {
			let answer=answerButton.innerHTML;
			checkAnswer(question, answer, questionEl);
		});
	});
}
function checkAnswer(question, answer) {
	let answerButtons=document.querySelectorAll("button.answer-btn");
	answerButtons.forEach((answerButton) => {
		answerButton.setAttribute("disabled", "");
	});
	let answerPos=question.answers.indexOf(answer);
	let message;
	if(answerPos===question.correct) {
		message=`
			Parabéns, você acertou!
		`;
		score+=1;
	}
	else {
		let correctAnswer=question.answers[question.correct];
		message=`
			Que pena, você errou! A resposta certa era: 
			<span class="correct-answer">${correctAnswer}</span>
		`;
	}
	messageDiv.innerHTML=message;
	messageDiv.focus();
	nextButton.removeAttribute("disabled");
}
showQuestion(questions[currentQuestion]);
nextButton.addEventListener("click", (evt) => {
	currentQuestion+=1;
	questionEl.innerHTML="";
	let questionsNumber=questions.length;
	if(currentQuestion===questionsNumber) {
		messageDiv.innerHTML="Parabéns! Você chegou ao fim do jogo. Sua pontuação total foi "+score+".";
		messageDiv.focus();
		questionEl.innerHTML="";
		nextButton.setAttribute("disabled", "");
		finishDiv.hidden=false;
	}
	else {
		messageDiv.innerHTML="";
		showQuestion(questions[currentQuestion]);
		let questionTitle=document.getElementById("question-number");
		questionTitle.focus();
		nextButton.setAttribute("disabled", "");
	}
});
finishButton.addEventListener("click", (evt) => {
	window.close();
});