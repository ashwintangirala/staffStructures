var app = angular.module('myApp');

app.factory('accounts', [
 '$resource' 
 , function($resource){
  return $resource('/accounts.json', {}, {
        query:   {method:'GET', isArray: true},
        create:  {method: 'POST'}
  });
}]);


app.factory('account', [
 '$resource' 
 , function($resource ){
  return $resource('/accounts/:id.json', {}, {
        show: {method: 'GET'},
        update: { method: 'PUT', params: {id: '@id'} },
        delete: {method: 'DELETE', params:{id: '@id'}}
  });
}]);
