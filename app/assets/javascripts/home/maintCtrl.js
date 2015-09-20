var app =  angular.module('myApp');

app.controller('MainCtrl', [
'$scope'
, 'employees'
, 'employee'
, 'teams'
, 'team'
, '$resource'
, function($scope, employees, employee, teams, team, $resource){
  $scope.test = 'Hello!';

  $scope.posts = [
  {title: 'post 1', type:"email"}
  ,{title: 'post 2', type:"text"}
  ,{title: 'post 3', type:"email"}
  ,{title: 'post 4', type:"twtr"}
  ,{title: 'post 5', type:"fb"}
  ];


  $scope.teams = teams.query(); 

  $scope.employees = employees.query(); 

  $scope.addTeam = function(){
    var new_team = teams.create( {name: $scope.name} ) ;
    $scope.teams.push(new_team); 
    $scope.name = ''; 
  }

  $scope.updateTeam = function(teamID){   
    team.update({id: teamID}); 
  };


  $scope.deleteTeam = function(teamID){
    team.delete( {id: teamID} ); 
    $scope.teams = teams.query();
  };

  $scope.deleteEmployee = function(empID){
    employee.delete( {id: empID} ); 
    $scope.employees = employees.query();
  };


  $scope.a = {}; 

  $scope.team_hover_over  = function(index ){
    this.show_trash = true;
  }

  $scope.team_leave  = function( ){
    this.show_trash = false; 
  }

  $scope.addEmployee = function(){
    var new_emp = employees.create( {name: $scope.emp_name} ) ;
    $scope.employees.push(new_emp); 
    $scope.emp_name = '';  
  }
}])
