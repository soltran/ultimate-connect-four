'use strict';
/*jshint esnext: true */

function Game (LocalStorage) {

  var service = {
    'createBoard': createBoard,
    'getBoard': getBoard
  };

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
    LocalStorage.put('board', board);
    return board;
  };

  function getBoard(){
  	return LocalStorage.get('board');
  };


  return service;
}

Game.$inject = ['LocalStorage'];

export default Game;
