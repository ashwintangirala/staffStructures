var app =  angular.module('myApp');

app.controller('MainCtrl', [
'$scope'
, 'employees'
, 'employee'
, 'teams'
, 'team'
, 'accounts'
, 'account'
, '$resource'
, function($scope, employees, employee, teams, team, accounts, account, $resource){

  
    $scope.message = "works?";
    $scope.models = {
        selected: null,
        templates: ['car', 'product'],
        dropzones: {
            "A": [ 
                   {type: 'container', id: 78
                   , columns: [
                         {type: 'item', id: 2}
                       , {type: 'item', id: 7}
                   ]
                   }
                 , {type: 'item', id: 3}
                 , {type: 'item', id: 4}
                 ]
          ,  "B": [
                {
                    "type": "item",
                    "id": 7
                },
                {
                    "type": "item",
                    "id": "8"
                } ]
        }
  }

  $scope.teams = teams.query(); 

  $scope.employees = employees.query(); 

  $scope.accounts = accounts.query(); 

  $scope.addAccount = function(){
    var new_acct= accounts.create( {name: $scope.acct_name} ) ;
    $scope.accounts.push(new_acct); 
    $scope.acct_name = ''; 
  }

  $scope.deleteAccount = function(acctID){
    
    account.delete( {id: acctID} ); 
    $scope.accounts = accounts.query();
  };


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
