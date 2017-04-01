// console.log('hello');
// Tube map memory game:
//
// Player clicks start to start the game
// Player is presented with a randomly selected London Underground tube stop
// and a list of possible radio/select button options, one or more of which are correct (depending on the station), also 'none'
// Player makes selection(s)
// Computer returns whether selection(s) are correct
// A point is given for each correctly guessed station
// Game is timed
// Game ends when the first incorrect selection is made or all stations are correctly guessed
//


$('.reset').on('click', function(){
  // clears the html content of all elements
  $('.answer1').html('');
  $('.answer2').html('');
  $('.answer3').html('');
  $('.answer4').html('');
});
