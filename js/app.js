$(init);

let stationCode;
let answer;
let time          = 0;
let userAnswers   = [];

function init() {
  $('.startGame button').on('click', startGame);
}

function startGame() {
  createLineButtons();
  pickRandomStation();
  $('.lines li').on('click', pickAnswers);
  $('.submit button').on('click', compareArrays);
}

function createLineButtons() {
  const $lines = $('.lines');
  for (const line in window.lines) {
    $lines.append(`<li data-line="${line}">${window.lines[line]}</li>`);
  }
}

function pickRandomStation() {
  stationCode = Object.keys(window.stations)[Math.floor(Math.random() * Object.keys(window.stations).length)];
  $('.lineName p span').text(window.stations[stationCode]);
  answer = window.linesAtStation[stationCode];
}

function pickAnswers() {
  $(this).toggleClass('selected');
  $(this).hasClass('selected') ? userAnswers.push($(this).attr('data-line')) : userAnswers.splice(userAnswers.indexOf($(this).attr('data-line'), 1));
}

function compareArrays() {
  console.log('Answer Array', answer.toString());
  console.log('Users Array', userAnswers.toString());

  // compares both arrays to see if they have the same values inside them
  // userAnswers.sort().toString() === answer.sort().toString() ? correctAnswer() : wrongAnswer();

  // more complex comparison of arrays

}

function correctAnswer() {
  $('.display p').text('Correct!');
  userAnswers = [];
  $('.lines li').removeClass('selected');

  pickRandomStation();
}

function wrongAnswer() {
  $('.display p').text('Wrong!');
}
