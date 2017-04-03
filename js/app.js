$(() => {
  // console.log('Ready'); is this all that need to be done to set up jQuery???

  $('li').on('click', function() {
    console.log($(this).attr('class'));
  });
});

// Tube map memory game - game play:
// Player is presented with a one of the 11 London Underground lines (randomly generated)
// Player is also presented with three possible options for number of stations (displayed as buttons)
// One of the options is correct, the other two are incorrect
// Player clicks on the button they think represents the correct number
// Player then clicks on the 'Submit' button to submit their selection
// Player is then presented with another randomly generated line and repeats the process
// Process repeats until selections for all 11 lines have been submitted
// Computer then displays how many selections the player got correct (out of 11)
// Game is timed and timer starts as soon as the first line is displayed


// starting the game:
// player will click on 'Start' button to start the game (and timer? Where will 'Start' button and 'Timer' sit on page?)

// Pseudocode (for game logic):
// game will require a for loop to iterate through the lines.length???
// first step is to create a function to randomly select a 'line' (from the 11 available key/value pairs)
// then need a function to display this line selection in the 'line name' div
// function to take the correct 'station number' value from the relevant key/value pair
// function to put this number into one of the three available 'li' elements (selected at random)
// function to also generate two incorrect 'station number' options (use Math.random?)
// function to put these two numbers into the other two available 'li' elements
// on.click function to allow player to make their selection by clicking on a 'li' element
// (also need to include a function that allows player to change their choice)
// on.click(??) on 'Submit' (button??) to allow player to submit their choice
// game ends if player makes incorrect selection
// function to hold player's choices until end of game (is this held in an array?)
// if player makes correct selection, game iterates through to next randomly selected line

//timing the game:
// need to include a timer (To start as soon as player clicks on 'start'? Where will Timer sit on the page?)

// key/value pair of lines & station numbers:
const linesAndStations = {
  'Bakerloo': 25,
  'Central': 49,
  'Circle': 36,
  'District': 60,
  'Hammersmith & City': 29,
  'Jubilee': 27,
  'Metropolitan': 34,
  'Northern': 50,
  'Picadilly': 53,
  'Victoria': 16,
  'Waterloo & City': 2
  // is it correct that lines end w , rather than ;???
};




//reset
$('.reset').on('click', function(){
  // clears the html content of all elements
  $('.answer1').html('');
  $('.answer2').html('');
  $('.answer3').html('');
  $('.answer4').html('');
});
