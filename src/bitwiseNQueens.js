var calc = function(n) {
  var startTime = (new Date).getTime();
  // Check correct input
  if (typeof n !== 'number' || n <= 0) {
    return 'The board must have a size greater or equal to 1';
  }

  // Board and counters
  var boardLimit
  n === 1 ? boardLimit = 0 : boardLimit = 1 << n-1;
  var col = 0;
  var majDiag = 0;
  var minDiag = 0;
  var solutions = 0;
  var counter = 0;

  // Recursive inspect
  var inspect = function(col, majDiag, minDiag) {
    var newCol = col;
    var newMajDiag = majDiag >>> 1; // Move the major diagonal bits to the right.
    var newMinDiag = minDiag << 1; // Move the minor diagonal bits to the left
    var row = newCol | newMajDiag | newMinDiag; // Determine the valid locations in a row. 0 = valid, 1 = contested
    for (var i = 1; i <= boardLimit; i = i << 1) { // Create bit mask that marches 1 from right to left to select which column in a row to consider
      if (~row & i) { // check in the column i in row is valid for a new piece
        newCol = newCol | i; // marks the column as contested in this space
        counter++;
        newMajDiag = newMajDiag | i; //mark the major diagnonal as contested
        newMinDiag = newMinDiag | i; // mark the minor diagonal as contested
        if (counter === n) {
          solutions++;
        }
        inspect(newCol, newMajDiag, newMinDiag);
        newCol = newCol & ~i;
        newMajDiag = newMajDiag & ~i;
        newMinDiag = newMinDiag & ~i;
        counter--;
      }
    }
  };
  inspect(col, majDiag, minDiag);
  var endTime = (new Date).getTime();
  console.log('Number of solutions for ' + n + ' queens:', solutions);
  console.log('Time: ' + (endTime - startTime) );
  return solutions;
};
