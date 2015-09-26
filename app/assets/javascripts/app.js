var app = angular.module('myApp',  ['ui.router', 'templates', 'xeditable', 'ngResource']); 

app.config([
  '$stateProvider'
  , '$urlRouterProvider'
  , function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state( 'home', {
        url: '/home'
        , templateUrl: '../templates/home/_home.html'
        //, controller: 'MainCtrl' 
      })

    $urlRouterProvider.otherwise('home') ;
  }])

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

