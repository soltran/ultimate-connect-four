'use strict';
/*jshint esnext: true */

function Game () {

  var service = {
    'createBoard': createBoard
  }

  // define functions here

  function createBoard(r, c){
    console.log('prints');
    var rows = r
    var columns = c
    var board = [];

    for(var i = 0; i < columns; i++){
      var inside = [];
      for(var j = 0; j < rows; j++){
        inside.push(' ');
      }
      board.push(inside);
    }
    console.log(board);

    return board;
  }



  return service;
}

Game.$inject = [];

export default Game;
