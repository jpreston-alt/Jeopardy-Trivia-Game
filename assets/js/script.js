const startBtnEl = $(".start-game-btn");
const introScreenEl = $("#intro-screen");
const questionScreenEl = $("#question-screen");
const askedQuestionEl = $("#question-display");
const categoryEl = $("#category-display");
const submitBtnEl = $(".submit-btn")
const answerInputEl = $("#user-answer")
const correctOrNotEl = $("#correct-or-not");
const nextQuestionBtnEl = $(".next-question-btn");

let askedQuestion;

askQuestion();

function Question (question, answer, category) {
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.checkIfCorrect = function(userAns){
        if (this.answer === userAns) {
            correctOrNotEl.text("Correct!")
        } else {
            correctOrNotEl.text("Nope, sorry.")
        }
    }
};


startBtnEl.on("click", function(event) {
    event.preventDefault();
    questionScreenEl.removeClass("display-none");
    introScreenEl.addClass("display-none");
    correctOrNotEl.text("");
    answerInputEl.val("");
    askQuestion();
});

nextQuestionBtnEl.on("click", function (event) {
    event.preventDefault();
    correctOrNotEl.text("");
    answerInputEl.val("");
    askQuestion();
});

submitBtnEl.on("click", function () {
    let userAns = lowercase(answerInputEl.val());
    console.log(askedQuestion.answer);
    askedQuestion.checkIfCorrect(userAns);
});



function askQuestion() {
    $.ajax({
        url: "http://jservice.io/api/random",
        method: "GET"
    }).done(function (response) {
        console.log(response);

        askedQuestion = new Question(
            response[0].question,
            lowercase(response[0].answer),
            response[0].category.title
        );

        askedQuestionEl.text(askedQuestion.question);
        categoryEl.text(askedQuestion.category);

        return askedQuestion;
    });
};

function lowercase(str) {
    return str.toLowerCase();
};


// add ability to wikipedia something you don't understand

// http://jservice.io/api/clues?category=139

// http://jservice.io/api/random?count=2

// http://jservice.io/api/categories?count=200


