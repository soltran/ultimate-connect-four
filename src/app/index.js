'use strict';
/*jshint esnext: true */

import MainCtrl from './main/main.controller';
import GameCtrl from './game/game.controller';
import NavbarCtrl from '../components/navbar/navbar.controller';

angular.module('connectFour', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial'])
  .controller('MainCtrl', MainCtrl)
  .controller('NavbarCtrl', NavbarCtrl)
  
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
