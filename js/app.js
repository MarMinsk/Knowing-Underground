$(init);

let stationCode;
let answer;
let $timer        = 9;
let userAnswers   = [];
let score         = 0;

function init() {
  $('button.startGame').on('click', startGame);
  $('.scoreboard1, .scoreboard2, .lineName, .submit, .reset').hide();
  $('.reset').on('click', clearContents);
  $('.lines').on('click', 'li', pickAnswers);
  $('background-image').show();

}

function startGame(e) {
  $('.scoreboard1, .scoreboard2, .lineName, .submit, .reset').show();
  e.stopPropagation();
  $(this).off('click');
  createLineButtons();
  pickRandomStation();
  $('.submit').on('click', compareArrays);
  startTimer();
  // var mainImg = $('.main');
  // mainImg.hide();
  $('.main').css('background-image', 'none');
  // console.log('reached');


  const counter = setInterval(startTimer, 1000);

  function startTimer() {
    $timer -=1;
    $('#timer').text('' +$timer);
    if ($timer === 0) {
      clearInterval(counter);
      $(`<div id="timer">Mind the closing doors, time's up!</div>`).appendTo($('.main'));
    }
  }
}

function createLineButtons() {
  const $lines = $('.lines');
  for (const line in window.lines) {
    $lines.append(`<li data-line="${line}" class="${line}">${window.lines[line]}</li>`);
  }
}

function pickRandomStation() {
  stationCode = Object.keys(window.stations)[Math.floor(Math.random() * Object.keys(window.stations).length)];
  $('.lineName p span').text(window.stations[stationCode]);
  answer = window.linesAtStation[stationCode];
}

function pickAnswers() {
  $(this).toggleClass('selected animated pulse');
  $(this).hasClass('selected') ? userAnswers.push($(this).attr('data-line')) : userAnswers.splice(userAnswers.indexOf($(this).attr('data-line'), 1));
}

function compareArrays() {
  console.log('Answer Array', answer.toString());
  console.log('Users Array', userAnswers.toString());
  userAnswers.sort().toString() === answer.sort().toString() ? correctAnswer() : wrongAnswer();
}

function correctAnswer() {
  score++;
  $('#score').text('' +score);
  $('#gameResponse').text('Correct!');
  userAnswers = [];
  $('.lines li').removeClass('selected');
  pickRandomStation();
}

function wrongAnswer() {
  $('#gameResponse').text('Wrong!');
  $(`<div class="game-over">Wrong bro ${score}</div>`).appendTo($('main'));
}

function clearContents() {
  $('.lines').empty();
  $('.lineName p span').text('');
  $('#gameResponse').text('');
  stationCode = null;
  answer      = null;
  userAnswers = [];

  $('.submit').off('click');
  $('button.startGame').on('click', startGame);
}
