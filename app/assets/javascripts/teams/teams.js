var app = angular.module('myApp');

app.factory('teams', [
 '$resource' 
 , function($resource ){
  return $resource('/teams.json', {}, {
        query:   {method:'GET', isArray: true},
        create:  {method: 'POST'}
  }); 
}]);


app.factory('team', [
 '$resource' 
 , function($resource ){
  return $resource('/teams/:id.json', {}, {
        show: {method: 'GET'},
        delete: {method: 'DELETE', params:{id: '@id'}},
        update:  {method: 'PUT', params: {id: '@id'}}  
  }); 
}]);
