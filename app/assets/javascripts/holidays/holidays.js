var app = angular.module('myApp');

app.factory('holidays', [
 '$resource' 
 , function($resource ){
  return $resource('/holidays.json', {}, {
        query:   {method:'GET', isArray: true},
        create:  {method: 'POST'}
  }); 
}]);


app.factory('holiday', [
 '$resource' 
 , function($resource ){
  return $resource('/holidays/:id.json', {}, {
        show: {method: 'GET'},
        delete: {method: 'DELETE', params:{id: '@id'}},

  }); 
}]);
