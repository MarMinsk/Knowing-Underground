// initializes & makes (the program) DOM ready?? what's the diff btw this and $(() => {
$(init);

// using window. - indicates something is defined as a window object - this means that the object is accessible anywhere (not best practice to do this)


// these variables are all being called in the global scope (why??)
// stationCode is taking the key from the object window.stations (in data.js) e.g. BST, CHX
let stationCode;
// answer is window.linesAtStation[stationCode], used in function pickRandomStation();
let answer;
// time will be the game timer
let $timer         = 31;
// userAnswers will be an array that will be populated with the player's selection(s)
let userAnswers   = [];
let score         = 0;

// this function 'init' starts the game (is that all or does it do something more????)
function init() {
  // on clicking on the button with the class 'startGame' the startGame function below is enacted
  // I made this 'one' click so that it isn't possible to click 'Start' button multiple times to add additional lines array to game board
  // start game can happen with or without button.
  $('.scoreboard1, .scoreboard2').hide();
  $('button.startGame').on('click', startGame);
  $('.reset').on('click', clearContents);
  $('.lines').on('click', 'li', pickAnswers);
}

// this function is called in the the 'init' function above
function startGame(e) {
  $('.scoreboard1, .scoreboard2').show();
  // console.log('start game');
  e.stopPropagation();

  $(this).off('click');
  createLineButtons();
  pickRandomStation();
  $('.submit').on('click', compareArrays);
  startTimer();

  // countdown timer function - needs to be included here to be called by startGame function
  const counter = setInterval(startTimer, 1000);
  function startTimer() {
    $timer -=1;
    //console.log($timer);
    if ($timer === 0) {
      alert('sorry, out of time');
      clearInterval(counter);
      // this reloads the page (to avoid the timer counting into negative numbers)
      document.location.reload();
    }
    //displays the countdown timer (text) in the 'timer' id div
    $('#timer').text('' +$timer);
  }
}

// this function adds the buttons for the 11 different lines to the html page
function createLineButtons() {
  // this creates a variable $lines, which populates the html 'lines' class
  const $lines = $('.lines');

  for (const line in window.lines) {
    // line append is creating these elements - hidden data atrirbute class called data-line is assigned to each li item taking the line frm the data.js file - the text in the li is populated by the name of the relevant line ${...} string interpolation
    $lines.append(`<li data-line="${line}" class="${line}">${window.lines[line]}</li>`);
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
// need to remove console.log at some point so players can't see the correct answer in console log
  console.log('Answer Array', answer.toString());
  console.log('Users Array', userAnswers.toString());
//
//   // compares userAnswer and (correct) answer arrays to see if they have the same values inside them
//   //.sort() to put multiple userAnswers and answer in same order .toString() to convert to string (from what, integer???)
//   // ternary ? correctAnswer() calls that function : wrongAnswer() calls that function (below)
  userAnswers.sort().toString() === answer.sort().toString() ? correctAnswer() : wrongAnswer();
}

// compare userAnswers to answer array:
// if match, trigger correctAnswer function (below)
// if not match, wrongAnswer should be 'Not quite. You have x out of y (e.g. 0 out of 1 or 1 out of 3) correct'
//
// answer.sort() => [1,2,3,4,5]
//
if (answer.indexOf(userAnswers.sort().toString()) !== -1) {
  console.log('same length');
} else {
  console.log('different length');
}
//



function correctAnswer() {
  score++;
  $('#score').text('' +score);
  $('#gameResponse').text('Correct!');
  userAnswers = [];
  $('.lines li').removeClass('selected');

  pickRandomStation();
}

function wrongAnswer() {
  // Change text to 'You got x out of y lines correct. Try again.', where x is the player's selection and y is the correct number of stations.
  $('#gameResponse').text('Wrong!');
}

function clearContents() {
  $('.lines').empty();
  $('.lineName p span').text('');
  $('#gameResponse').text('');
  stationCode = null;
  answer      = null;
  userAnswers = [];

  $('.submit').off('click');
  // this could work with or without the button. prefix
  $('button.startGame').on('click', startGame);
}


// things to sort out:
// why timer is not displaying properly in 'time remaining' span
// how to include more complex logic - so that player sees 'you got 1 out of 3 lines correct'
// how to avoid player having to click 'start' when 'play again' is clicked for next game play
// how to stop timer going into negative count (currently using page reload to work around this but would like a better solution)
// how to add a range of 'game response' options e.g. 'correct!' 'great!' 'well done' 'not quite' 'try again' etc...
