angular.module('myApp')
.controller('teamCtrl', [
  '$scope'
  , '$stateParams'
  , 'teams'
  , function($scope, $stateParams, teams){
    $scope.team = teams.teams[$stateParams.id]; 

  }])
