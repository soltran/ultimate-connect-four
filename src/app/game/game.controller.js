'use strict';
/*jshint esnext: true */

function GameCtrl (Game) {
  var vm = this;
  
  vm.builtBoard = Game.getBoard();
  vm.player = Game.getPlayer() || 0;
	vm.board = {
		'rows': 8,
		'columns': 8
	};
  vm.move = move;
  vm.gameStatus = Game.getStatus();


  vm.createBoard = createBoard;




  // define functions here

  function createBoard(){
    vm.builtBoard = Game.createBoard(vm.board.rows, vm.board.columns);
  }

  function move(column){
     Game.dropChip(column);
     vm.player = Game.getPlayer();
     vm.builtBoard = Game.getBoard();
     vm.gameStatus = Game.getStatus();
  }

};

GameCtrl.$inject = ['Game'];

export default GameCtrl;
