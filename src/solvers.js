/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for ( var row = 0; row < n ; row++) {
    solution[row] = [];
    for ( var col = 0; col < n ; col++) {
      solution[row][col] = row === col ? 1 : 0;
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // var startTime = (new Date()).getTime();

  var solutionCount = 0;

  //Generate empty board of size n x n
  var testBoard = new Board({'n': n});

  var countWinners = function (currCol){
    // if currCol is equal to n
    if ( currCol === n ) {
      // This is a valid board, increment the solution count
      // and return
      solutionCount++;
      return;
    }
    //for each row in the board
    for ( var currRow = 0 ; currRow < n ; currRow++ ) {
      // if we're over 1/2 way for even n
      if( n % 2 === 0 && (currCol === 0 && (currRow === (n/2)))){
        solutionCount *= 2;
        return;
      }
      //add a piece to the currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
      //test if this is a valid board
      if ( !testBoard.hasAnyRooksConflicts() ) {
        // if it recurse for column + 1
        countWinners(currCol + 1);
      }
      // toggle off piece at currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
    }
  };
  countWinners(0);

  // var endTime = (new Date()).getTime();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // console.log('Time: ' + (endTime - startTime) );
  // debugger;
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  //Generate empty board of size n x n
  var testBoard = new Board({'n': n});



  var countWinners = function (currCol){
    // if currCol is equal to n
    if ( currCol === n ) {
      // This is a valid board, increment the solution count
      // and return
      return testBoard;
    }
    //for each row in the board
    for ( var currRow = 0 ; currRow < n ; currRow++ ) {
      //add a piece to the currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
      //test if this is a valid board
      if ( !testBoard.hasAnyQueensConflicts() ) {
        // if it recurse for column + 1
        var result = countWinners(currCol + 1);
        if(result !== null) { return result;}
      }
      // toggle off piece at currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
    }
    return null;
  };


  if(n === 2 || n === 3) {
    solution = testBoard.rows();
  } else {
    solution = countWinners(0).rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var startTime = (new Date()).getTime();

  var solutionCount = 0;

  //Generate empty board of size n x n
  var testBoard = new Board({'n': n});

  var countWinners = function (currCol){

    // if currCol is equal to n
    if ( currCol === n ) {
      // This is a valid board, increment the solution count
      // and return
      solutionCount++;
      return;
    }
    //for each row in the board
    for ( var currRow = 0 ; currRow < n ; currRow++ ) {
      // if we're over 1/2 way for even n
      if( n % 2 === 0 && (currCol === 0 && (currRow === (n/2)))){
        solutionCount *= 2;
        return;
      }
      //add a piece to the currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
      //test if this is a valid board
      if ( !testBoard.hasAnyQueensConflicts() ) {
        // if it recurse for column + 1
        countWinners(currCol + 1);
      }
      // toggle off piece at currentRow and currCol
      testBoard.togglePiece(currRow, currCol);
    }
  };


  if(n !== 2 && n !== 3) {
    countWinners(0);
  }

  var endTime = (new Date()).getTime();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  console.log('Time: ' + (endTime - startTime) );
  return solutionCount;
};
