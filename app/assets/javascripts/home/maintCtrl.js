var app =  angular.module('myApp'); 

app.controller('MainCtrl', [
'$scope'  
, 'employees'
, 'teams'
, 'team'
, '$resource'
, function($scope, employees, teams, team, $resource){
  $scope.test = 'Hello!';

  $scope.teams = teams.query(); 

  $scope.employees = employees.query(); 

  $scope.addTeam = function(){
    teams.create( {name: $scope.name} ) ;
    $scope.name = '';  
    $scope.teams = teams.query(); 
  }

  $scope.deleteTeam = function(teamID){
    team.delete( {id: teamID}); 
  };

  $scope.a = {}; 


  $scope.addEmployee = function(){
    employees.create( {name: $scope.emp_name} ) ;
    $scope.emp_name = '';  
  }

}])