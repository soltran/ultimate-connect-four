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
  	var x = move[0];
  	var y = move[1];
  	var token = gameBoard[x][y];

  	if(checkVerticalWin(x, y, token) || checkOtherWin(x, y, token)){
  		alert('Player ' + (gamePlayer + 1) + ' Wins!');
  		return true;
  	} else {
  		return false;
  	}
  }



  function checkVerticalWin(x, y, token){
  	for(var i = 1; i < 4; i++){
  		var row = y - i;
  		if(row < 0 || gameBoard[x][row] != token){
  			return false;
  		}
  	}
  	return true;
  }

  function checkOtherWin(x, y, token){
  	var slopes = [-1, 1, 0];
  	var isWin = false;

  	// check each of the directions

  	for(var k = 0; k < 3; k++){
  		var slope = slopes[k];
  		var count = 1;

  		// check Left Side
  		for(var i = 1; i < 4; i++){
  			var column = x - i;
  			var row = y - (slope * i);
  			var outOfBounds = column < 0 || row < 0 || column >= gameBoard.length || row >= gameBoard[0].length;
  			
  			// Check to see if it hits the edge

  			if( outOfBounds || (gameBoard[column][row] != token)){
  				break;
  			} else {
  				count++;
  			}
  		}

  		if(count < 4){
  			// check right Side
  			console.log('check right side');
  			for(var i = 1; i < 4; i++){
	  			var column = x + i;
	  			var row = y + (slope * i);
	  			console.log('column', column, 'row', row);

	  			var outOfBounds = column < 0 || row < 0 || column >= gameBoard.length || row >= gameBoard[0].length;
	  			
	  			// Check to see if it hits the edge

	  			if(outOfBounds || (gameBoard[column][row] != token)){
	  				break;
	  			} else {
	  				count++;
	  				if(count == 4){
	  					isWin = true;
	  					break;
	  				}
	  			}
  			}
  		} else {
  			isWin = true;
  			break;
  		}
  	};
	return isWin;
  };

  return service;
}

Game.$inject = ['LocalStorage'];

export default Game;
