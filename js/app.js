// initializes & makes (the program) DOM ready?? what's the diff btw this and $(() => {
$(init);

// using window. - indicates something is defined as a window object - this means that the object is accessible anywhere (not best practice to do this)


// these variables are all being called in the global scope (why??)
// stationCode is taking the key from the object window.stations (in data.js) e.g. BST, CHX
let stationCode;
// answer is window.linesAtStation[stationCode], used in function pickRandomStation();
let answer;
// time will be the game timer
let time          = 0;
// userAnswers will be an array that will be populated with the player's selection(s)
let userAnswers   = [];
let score         = 0;

// this function 'init' starts the game (is that all or does it do something more????)
function init() {
  // on clicking on the button with the class 'startGame' the startGame function below is enacted
  // I made this 'one' click so that it isn't possible to click 'Start' button multiple times to add additional lines array to game board
  $('.startGame button').on('click', startGame);
  $('.reset').on('click', clearContents);
  $('.lines').on('click', 'li', pickAnswers);
}

// this function is called in the the 'init' function above
function startGame(e) {
  e.stopPropagation();

  $(this).off('click');
  createLineButtons();
  pickRandomStation();
  $('.submit button').on('click', compareArrays);
}

// this function adds the buttons for the 11 different lines to the html page
function createLineButtons() {
  // this creates a variable $lines, which populates the html 'lines' class
  const $lines = $('.lines');

  for (const line in window.lines) {
    // line append is creating these elements - hidden data atrirbute class called data-line is assigned to each li item taking the line frm the data.js file - the text in the li is populated by the name of the relevant line ${...} string interpolation
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

// need to remove this at some point so players can't see the correct answer in console log
function compareArrays() {
  console.log('Answer Array', answer.toString());
  console.log('Users Array', userAnswers.toString());

  // compares userAnswer and (correct) answer arrays to see if they have the same values inside them
  //.sort() to put multiple userAnswer and answer in same order .toString() to convert to string (from what, integer???)
  // ternary ? correctAnswer() calls that function : wrongAnswer() calls that function (below)
  userAnswers.sort().toString() === answer.sort().toString() ? correctAnswer() : wrongAnswer();

  // need a more complex comparison of arrays - need to compare 'Users Array' with 'Answer Array' to check whether both the length and the contents of the array match

  // answer.sort() => [1,2,3,4,5]
  //
  // answer.indexOf(userAnswers.sort().toString()) != -1 {
  //   // 1/answer.length
  // } else if {
  //
  // }

//   var isSame = answer.length == userAnswers.length && answer.every(function(element, index) {
//     return element === userAnswers[index];
//   });
//
//   console.log(isSame);
//

// need to include a score function -
// current score is counting each click, not correct clicks
//   var newscore = 0;
//   if (userAnswers === answer) {
//     // console log not working
//     console.log('score!');
//     score++;
//     $('#score').text(score);
//     $('answer').val('');
//   } else  {
//     score;
//   }
//
}

function correctAnswer() {
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

  $('.submit button').off('click');
  $('.startGame button').on('click', startGame);
}
