'use strict';
/*jshint esnext: true */

function GameCtrl (Game) {
  var vm = this;
  
  vm.builtBoard = Game.getBoard();
  vm.player = Game.getPlayer() || 0;
	vm.board = {
		'rows': 10,
		'columns': 8
	};
  vm.move = move;


  console.log('check');
  vm.createBoard = createBoard;




  // define functions here

  function createBoard(){
    vm.builtBoard = Game.createBoard(vm.board.rows, vm.board.columns);
  }

  function move(column){
     vm.player = vm.player ? 0 : 1;
     Game.setPlayer(vm.player);
     Game.dropChip(column);
     vm.builtBoard = Game.getBoard();
  }

};

GameCtrl.$inject = ['Game'];

export default GameCtrl;
