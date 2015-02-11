'use strict';
/*jshint esnext: true */

function Game (LocalStorage) {

  var service = {
    'createBoard': createBoard,
    'getBoard': getBoard,
    'setBoard': setBoard,
    'getPlayer': getPlayer,
    'setPlayer': setPlayer,
    'dropChip': dropChip,
    'getStatus': getStatus
  };

  var gameBoard = LocalStorage.get('board');
  var gamePlayer = getPlayer();
  var spacesLeft = getSpacesLeft();
  var gameStatus = "It's Player " + (gamePlayer + 1) + "'s Turn!";

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

  function getStatus(){
  	return gameStatus;
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

  function checkForConclusion(move){
  	decrementSpacesLeft();
  	console.log(spacesLeft);

  	if(isWin(move)){
  		gameStatus = "Player " + (gamePlayer + 1) + " wins!";
  	}
  	else if(spacesLeft == 0){
  		gameStatus = "Draw!"
  	} else {
  		nextTurn();
  	}
    var token = gameBoard[move[0]][move[1]];
  }

  function nextTurn(){
  	gamePlayer = gamePlayer ? 0 : 1;
  	setPlayer(gamePlayer);
  	gameStatus = "Play On! It's Player " + (gamePlayer + 1) + "'s Turn!"; 
  }

  function getSpacesLeft(){
  	LocalStorage.get('spacesLeft');
  }

  function decrementSpacesLeft(){
  	spacesLeft = spacesLeft - 1;
  	LocalStorage.put('spacesLeft', spacesLeft);
  }

  function setSpacesLeft(s){
  	spacesLeft = s;
  	LocalStorage.put('spacesLeft', s);
  }

  function isWin(move){
  	return false;
  }

  return service;
}

Game.$inject = ['LocalStorage'];

export default Game;
