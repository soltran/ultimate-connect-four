'use strict';
/*jshint esnext: true */

function LocalStorage ($window) {

  var service = {
    'get': get,
    'put': put
  }

  // define functions here
  function get(key) {
    var el = $window.localStorage[key];
    if (el && el != 'undefined') {
      return JSON.parse(el);
    } else {
      return undefined;
    }
  }

  function put(key, value) {
    $window.localStorage[key] = JSON.stringify(value);
    return true;
  }
  



  return service;
}

LocalStorage.$inject = ['$window'];

export default LocalStorage;

