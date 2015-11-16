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
, '$linq'
, function($scope, employees, employee, teams, team, accounts, account, $resource, $linq){ 

    $scope.message = "works?";

    $scope.account_raw_data=[
    {name:'goldman', volume: 10, region: 'Asia', country:'HK'},
    {name:'goldman', volume: 34, region: 'EMEA', country:'Sweden'},
    {name:'perry', volume: 23, region: 'EMEA', country:'Denmark'},
    {name:'perry', volume: 20, region: 'Americas', country:'USA'}]; 

    var account_v1= 
    [
    {name:'goldman', volume: 10, price: 10},
    {name:'perry', volume: 34, price: 10}
    ];

    var acct_models = 
    {
      templates: null 
      , selected: null
      , zones: { "a": [], "b": [] }
    };

    var z = { "a": [], "c": [] }

    var dataString=[ 
     { category : "Search Engines", machine: 'p', "hits" : 1, "bytes" : 10000 },
     { category : "Content Server", machine: 'p', "hits" : 1, "bytes" : 10000 },
     { category : "Content Server", machine: 'p', "hits" : 1, "bytes" : 10000 },
     { category : "Search Engines", machine: 'p', "hits" : 1, "bytes" : 10000 },
     { category : "Business", machine: 'a', "hits" : 1, "bytes" : 10000 },
     { category : "Content Server", machine: 'a', "hits" : 1, "bytes" : 10000 },
     { category : "Internet Services", machine: 'a', "hits" : 1, "bytes" : 10000 },
     { category : "Search Engines", machine: 'a', "hits" : 1, "bytes" : 10000 },
     { category : "Search Engines", machine: 'a', "hits" : 1, "bytes" : 10000 } 
    ];

    //     var dataString=[ 
    //  { "category" : "Search Engines", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Content Server", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Content Server", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Search Engines", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Business", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Content Server", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Internet Services", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Search Engines", "hits" : 1, "bytes" : 10000 },
    //  { "category" : "Search Engines", "hits" : 1, "bytes" : 10000 } 
    // ];
    // // debugger;

    // var aggregatedObject = enumerator.From(dataString)
    //     .GroupBy("$.category", null,
    //              function (key, g) {
    //                  return {
    //                    category: key,
    //                    hits: g.Sum("$.hits"),
    //                    bytes: g.Sum("$.bytes")
    //                  }
    //     })
    //     .ToArray();

    enumerator = $linq.Enumerable();

    var aggregatedObject = enumerator.From(dataString)
        .GroupBy("$.category", null,
                 function (key, g) {
                     return {
                       category: key,
                       hits: g.Sum("$.hits"),
                       bytes: g.Sum("$.bytes")
                     }
        })
        .ToArray();

    acct_models.zones = dataString;

    $scope.account_v1 = aggregatedObject;

    $scope.models = {
        selected: null,
        templates: [
            {type: "item", id: 2},
            {type: "container", id: 1, columns: [[], []]}  
        ],
        dropzones: {
            " Teams": [ 
                   {type: 'container'
                   , id: 78
                   , columns: [[
                         {type: 'item', id: 2}
                       , {type: 'item', id: 7}]
                   ]
                   }
                  
                  , {type: 'container' 
                     , id: 78 
                     , columns: [[
                         {type: 'item', id: 2}
                       , {type: 'item', id: 7}
                       ]]
                   }
                 ]
          ,  "Accounts": [
                {
                    "type": "item",
                    "id": 7
                },
                {
                    "type": "item",
                    "id": 8
                }]
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
