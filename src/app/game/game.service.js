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
  var spacesLeft = getSpacesLeft();

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
    setSpacesLeft(r * c);
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
  	for(var i = 0; i < rows.length; i++){
  		if(rows[i] == ""){
  			gameBoard[column][i] = gamePlayer ? 'X' : 'O';
  			setBoard(gameBoard);
  			checkForConclusion([column,i]);
  			break;
  		}
  	}
  }

  // private methods

  function checkForConclusion(){
  	decrementSpacesLeft();
    var token = gameBoard[column][i];
  }

  function getSpacesLeft(){
  	LocalStorage.get('spacesLeft');
  }

  function decrementSpacesLeft(){
  	spacesLeft--;
  	LocalStorage.set('spacesLeft', spacesLeft);
  }

  return service;
}

Game.$inject = ['LocalStorage'];

export default Game;
