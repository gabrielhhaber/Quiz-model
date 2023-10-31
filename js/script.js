let questions=[
	{
		text: "Qual é o nome do SSD mais vendido do mundo, de interface NvMe?",
		answers: ["WD Green", "Seagate Expansion", "Kingston Nv2", "Sandisk Plus"],
		correct: 2,
		errorMessage: "Na verdade, o SSD mais vendido do mundo de interface NvMe é o Kingston Nv2, que já teve outras versões muito conhecidas, como o Kingston Nv1."
	},
	{
		text: "Qual é a velocidade máxima suportada por um SSD NvMe?",
		answers: ["500mb/s", "1350mb/s", "3500mb/s", "7300mb/s"],
		correct: 3,
		errorMessage: "Na verdade, os SSDs de interface NvMe são os mais rápidos existentes, podendo chegar a até 7300mb/s de velocidade. Para se ter uma ideia, os SSDs sata, um padrão mais antigo, chegam a apenas 525mb/s."
	},
];
let currentQuestion=0;
let score=0;
let questionEl=document.getElementById("question-container");
let messageDiv=document.getElementById("question-message");
let nextButton=document.getElementById("next-question-btn");
let finishDiv=document.getElementById("end-game-container");
let finishButton=document.getElementById("end-game-btn");
function showQuestion(question) {
	let questionPos=questions.indexOf(question)+1;
	let questionsNumber=questions.length;
	let questionBody=`
		<h2 id="question-number" tabindex="-1">${questionPos}/${questionsNumber}</h2>
		<p class="question-text">${question.text}</p>
		<ul class="answers-list">
	`;
	question.answers.forEach((answer) => {
		questionBody+=`
			<li class="answer">
				<button class="answer-btn">${answer}</button>
			</li>
		`;
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
		message="Parabéns, você acertou!";
		score+=1;
	}
	else {
		message="Que pena, você errou! "+question.errorMessage;
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
		finishDiv.classList.remove("hidden");
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