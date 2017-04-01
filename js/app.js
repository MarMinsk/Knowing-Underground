// console.log('hello');
// Tube map memory game:
//
// Player clicks start to start the game
// Player is presented with one of the 11 London Underground lines (randomly generated)
// Player is also presented with three possible options for number of stations (displayed as buttons)
// One of the options is correct, the other two are incorrect
// Player clicks on the button they think represents the correct number
// Player then clicks on the Submit button to submit their selection
// Player is then presented with another randomly generated line and repeats the process
// Process repeats until selections for all 11 lines have been submitted
// Computer then displays how many selections the player got correct (out of 11)
// Game is timed and timer starts as soon as the first line is displayed


const lines = {
  'Bakerloo': 25;
  'Central': 49;
  'Circle': 36;
  'District': 60;
  'Hammersmith & City': 29;
  'Jubilee': 27;
  'Metropolitan': 34;
  'Northern': 50;
  'Picadilly': 53;
  'Victoria': 16;
  'Waterloo & City': 2;
};




//reset
$('.reset').on('click', function(){
  // clears the html content of all elements
  $('.answer1').html('');
  $('.answer2').html('');
  $('.answer3').html('');
  $('.answer4').html('');
});
