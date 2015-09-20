var app = angular.module('myApp');

app.factory('employees', [
 '$resource' 
 , function($resource){
  return $resource('/employees.json', {}, {
        query:   {method:'GET', isArray: true},
        create:  {method: 'POST'}
  });
}]);


app.factory('employee', [
 '$resource' 
 , function($resource ){
  return $resource('/employees/:id.json', {}, {
        show: {method: 'GET'},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: {method: 'DELETE', params:{id: '@id'}}
  });
}]);

