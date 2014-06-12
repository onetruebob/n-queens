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
  var makeCandidateRows = function (n) {
    var rows = [];
    var row;

    for (var i = 0 ; i < n; i++) {
      row = [];
      for( var j = 0; j < n; j++) {
        row[j] = i === j ? 1 : 0;
      }
      rows[i] = row;
    }

    return rows;
  };

  var candidateRows = makeCandidateRows(n);

  var getBoardsForDepth = function(depth) {

    var boardsCollection = [];

    if ( depth === 1 ) {
      for ( var i = 0 ; i < candidateRows.length ; i++ ) {
        boardsCollection.push([candidateRows[i]]);
      }
      return boardsCollection;
    }

    // for each row in candidate rows
    for ( var row = 0 ; row < candidateRows.length ; row++ ) {
      // get boards from previous depth  (depth-1)
      var previousBoards = getBoardsForDepth(depth-1);
      var noConflictBoards = [];
      // for each board in boards
      for ( var board = 0 ; board < previousBoards.length ; board++ ) {
        // add the row
        previousBoards[board].push(candidateRows[row]);
        var testBoard = new Board(previousBoards[board]);
        if ( !testBoard.hasAnyColConflicts() && !testBoard.hasAnyRowConflicts() ) {
          noConflictBoards.push(previousBoards[board]);
        }
      }
      // push boards onto our boardsCollection
      boardsCollection = boardsCollection.concat(noConflictBoards);
    }
    return boardsCollection;
  };

  var candidateBoards = getBoardsForDepth(n);

  var solutionCount = candidateBoards.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
