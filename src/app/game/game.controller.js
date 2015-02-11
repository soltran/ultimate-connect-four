'use strict';
/*jshint esnext: true */

function GameCtrl (Game) {
  var vm = this;

	vm.board = {
		'rows': 10,
		'columns': 8
	};
  vm.builtBoard = Game.getBoard();

  console.log('check');
  vm.createBoard = createBoard;



  // define functions here

  function createBoard(){
    console.log('creating board');
    vm.builtBoard = Game.createBoard(vm.board.rows, vm.board.columns);
  }

}

GameCtrl.$inject = ['Game'];

export default GameCtrl;
