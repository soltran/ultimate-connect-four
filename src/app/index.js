'use strict';
/*jshint esnext: true */
import MainCtrl from './main/main.controller';
import GameCtrl from './game/game.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';
import LocalStorage from '../components/localStorage/localStorage.service'
import Game from './game/game.service';

angular.module('connectFour', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial'])
  .controller('MainCtrl', MainCtrl)
  .controller('GameCtrl', GameCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  .factory('LocalStorage', LocalStorage)
  .service('Game', Game)


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })

      .state('game', {
        url: '/play',
        templateUrl: 'app/game/game.html',
        controller: 'GameCtrl',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  })
;
