// initializes & makes (the program) DOM ready?? what's the diff btw this and $(() => {
$(init);

// using window. - indicates something is defined as a window object - this means that the object is accessible anywhere (not best practice to do this)


// these variables are all being called in the global scope so can be called anywhere in the program (why??)
// stationCode is taking the key from the object window.stations (in data.js) e.g. BST, CHX
let stationCode;
// answer is window.linesAtStation[stationCode], used in function pickRandomStation();
let answer;
// $timer is used in the startTimer function
let $timer         = 9;
// userAnswers will be an array that will be populated with the player's selection(s)
let userAnswers   = [];
// score used in the correctAnswer function - needs to be outside the function so as not to reset score to 0 whenever correctAnswer function is run
let score         = 0;


//  'init' function starts the game (why do all these need to be in the init function??)
function init() {
  // on clicking on the button with the class 'startGame' the startGame function below is enacted (start game can happen with or without button. prefix)
  $('button.startGame').on('click', startGame);
  // .hides() hides the score and timer until startGame function is called
  $('.scoreboard1, .scoreboard2, .lineName, .submit, .reset').hide();
  $('#tubeImage').show();
  // clicking on 'reset' button triggers clearContents function below
  $('.reset').on('click', clearContents);
  // clicking on list items in lines class triggers pickAnswers function below
  $('.lines').on('click', 'li', pickAnswers);
}

// startGame function is called by the the 'init' function above (why is 'e' needed?)
// and includes all the functions that are needed to start the game
function startGame(e) {
  // .show() reveals the score and timer when 'start' button is clicked
  $('.scoreboard1, .scoreboard2, .lineName, .submit, .reset').show();
  $('#tubeImage').hide();
  // console.log('start game');
  // e.stopPropagation prevents the event from bubbling up the DOM tree & prevents any parent event handlers from being notified of the event
  e.stopPropagation();
  // relates to the .on('click') in init function above (how does this relationship work?)
  $(this).off('click');
  // triggers createLineButtons function below
  createLineButtons();
  // triggers the pickRandomStation function below
  pickRandomStation();
  // on clicking on .submit class button triggers the compare Arrays function
  $('.submit').on('click', compareArrays);
  // startTimer function called to start the game countdownn timer
  startTimer();

  // countdown timer function - needs to be included here to be called by startGame function (why??)
  const counter = setInterval(startTimer, 1000);
  function startTimer() {
    $timer -=1;
    //displays the countdown timer (text) in the 'timer' id div
    $('#timer').text('' +$timer);
    //console.log($timer);
    if ($timer === 0) {
      alert('Sorry, time\'s up!');
      clearInterval(counter);

      // this reloads the page (and resets the game) immediately timer has reached 0
      //have included this to avoid the timer counting into negative numbers
      document.location.reload();
    }
  }
}

// this function adds the buttons for the 11 different lines to the html page
function createLineButtons() {
  // this creates a variable $lines, which populates the html 'lines' class
  const $lines = $('.lines');

// 'in' - for each item inside window.lines create a placeholder for each item and then iterate through the array 
  for (const line in window.lines) {
    // line append is creating these elements - hidden data atrirbute class called data-line is assigned to each li item taking the line from the data.js file - the text in the li is populated by the name of the relevant line ${...} string interpolation
    $lines.append(`<li data-line="${line}" class="${line}">${window.lines[line]}</li>`);
  }
}
// this function will randomly select the stations to be included in the game
function pickRandomStation() {
  // station code variable - key taken from 'stations' object (in data.js file), Math.random method to make random station selection
  stationCode = Object.keys(window.stations)[Math.floor(Math.random() * Object.keys(window.stations).length)];
  // p span in lineName class is updated with text of the randomly selected stationCode
  $('.lineName p span').text(window.stations[stationCode]);
  // answer variable array (globally declared) is updated to include the randomly selected stationCode
  answer = window.linesAtStation[stationCode];
}

// this function is called by the on.click of the li elements in the 'line' class and allows player to make their selection
function pickAnswers() {
  // .toggleClass allows player to toggle between selecting and unselecting a li
  $(this).toggleClass('selected');
  // conditional (ternary) operator - if the li has class 'selected' we get the data-line attribute form the li and push it into user ansewr array
// if deit will be pushed into the
  $(this).hasClass('selected') ? userAnswers.push($(this).attr('data-line')) : userAnswers.splice(userAnswers.indexOf($(this).attr('data-line'), 1));
}

// this function is called by on.click of 'submit' in startGame function
// compares the answer provided by the player with the (correct) game answer
function compareArrays() {
// comment out console.log  so players can't see the correct answer in console log
  console.log('Answer Array', answer.toString());
  console.log('Users Array', userAnswers.toString());
//
// compares userAnswer and (correct) answer arrays to see if they have the same values inside them
// .sort() to put userAnswers and answer arrays in same order
// .toString() to convert to string (from what, integer???)
//  ternary ? correctAnswer() calls that function : wrongAnswer() calls that function (below)
  userAnswers.sort().toString() === answer.sort().toString() ? correctAnswer() : wrongAnswer();
}

// compare userAnswers to answer array:
// if match, trigger correctAnswer function (below)
// if not match, wrongAnswer should be 'Not quite. You have x out of y (e.g. 0 out of 1 or 1 out of 3) correct'
//
// answer.sort() => [1,2,3,4,5]
//
// if (answer.indexOf(userAnswers.sort().toString()) !== -1) {
//   console.log('same length');
// } else {
//   console.log('different length');
// }
//

// this function runs when  userAnswers correctly matches answer
function correctAnswer() {
  // when correct answer, this increments up by 1 to the score variable (initialised as 0)
  score++;
  // within 'score' id element, creates an empty text string, then updates the score within that string
  $('#score').text('' +score);
  // within 'gameResponse' id element, adds the text 'Correct!'
  $('#gameResponse').text('Correct!');
  userAnswers = [];
  // removes the 'selected' element formatting from the li elements in the lines class
  $('.lines li').removeClass('selected');

  // runs the pickRandomStation function again to add a new station to the span in the linesName class
  pickRandomStation();
}

function wrongAnswer() {
  // Change text to 'You got x out of y lines correct. Try again.', where x is the player's selection and y is the correct number of stations.
  $('#gameResponse').text('Wrong!');
}
// clicking on the 'reset' button triggers the .reset class which calls this clearContents function
function clearContents() {
  // the contents (li) of the line (ul) class are removed
  $('.lines').empty();
  // the span of the lineName class is cleared of text
  $('.lineName p span').text('');
  // the gameResponse id element is cleared of it's (correct or wrong) text
  $('#gameResponse').text('');
  // the stationCode variable, called in the pickRandomStation function is reset to null (why null??)
  stationCode = null;
  // the answer variable, also called in the pickRandomStation function is also reset to null
  answer      = null;
  // the userAnswers array, used in the pickAnswers function, is cleared
  userAnswers = [];

  $('.submit').off('click');
  // this could work with or without the button. prefix
  $('button.startGame').on('click', startGame);
}


// functionality to add / bug fixes:
// include more complex logic - so that for incorrect selections player player sees something like 'You got 1 out of 3 lines correct. Try again.'
// how to avoid player having to click 'start' when 'play again' is clicked for next game play
// how to stop timer going into negative count (currently using page reload to work around this but would like a better solution)
// how to add a range of 'game response' options e.g. 'correct!' 'great!' 'well done' 'not quite' 'try again' etc...
// move selected stations into a new array to remove them from game play options
