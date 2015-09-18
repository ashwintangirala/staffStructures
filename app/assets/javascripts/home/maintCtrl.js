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
    var new_team = teams.create( {name: $scope.name} ) ;
    $scope.teams.push(new_team); 
    $scope.name = '';      
  }


  $scope.deleteTeam = function(teamID){
    team.delete( {id: teamID}); 
  };


  $scope.a = {}; 

  $scope.team_hover_over  = function(index ){
    this.show_trash = true;
  }

  $scope.team_leave  = function( ){
    this.show_trash = false; 
  }

  $scope.addEmployee = function(){
    employees.create( {name: $scope.emp_name} ) ;
    $scope.emp_name = '';  
  }
}])

