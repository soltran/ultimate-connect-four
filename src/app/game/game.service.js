'use strict';
/*jshint esnext: true */

function Game (LocalStorage) {

  var service = {
    'createBoard': createBoard,
    'getBoard': getBoard,
    'setBoard': setBoard,
    'getPlayer': getPlayer,
    'setPlayer': setPlayer,
    'dropChip': dropChip
  };

  var gameBoard = LocalStorage.get('board');
  var gamePlayer = getPlayer();

  // define functions here

  function createBoard(r, c){
    var rows = r
    var columns = c
    var board = [];

    for(var i = 0; i < columns; i++){
      var inside = [];
      for(var j = 0; j < rows; j++){
        inside.push('');
      }
      board.push(inside);
    }
    setBoard(board);
    gameBoard = board;
    return board;
  };

  function getBoard(){
  	return LocalStorage.get('board');
  };

  function getPlayer(){
  	return LocalStorage.get('player');
  }

  function setPlayer(p){
  	LocalStorage.put('player', p);
  	gamePlayer = p;
  }

  function setBoard(b){
  	LocalStorage.put('board', b);
  }

  function dropChip(column){
  	var rows = gameBoard[column];
  	console.log('hi', rows);
  	for(var i = 0; i < rows.length; i++){
  		if(rows[i] == ""){
  			console.log(rows[i]);
  			gameBoard[column][i] = gamePlayer ? 'O' : 'X';
  			setBoard(gameBoard);
  			break;
  		}
  	}
  }

  return service;
}

Game.$inject = ['LocalStorage'];

export default Game;
