angular.module('myApp')
.factory('teams', [
	'$http' 
	, function($http ){

  var ts = {
    teams: [
      {name: 'mckinsey'}
    , {name: 'bain'}
    , {name: 'bcg'}
    ]
  }; 

  ts.getAll = function() {
    return $http.get('/teams.json').success(function(data){
      ts.teams.push.apply(ts.teams, data); 
      // angular.copy(data, ts.teams);
    });
  };

  ts.create = function(team){ 
    return $http.post('/teams.json', team).success(function(data){
      ts.teams.push(data); 
    }); 
  }; 

  return ts; 
}])

