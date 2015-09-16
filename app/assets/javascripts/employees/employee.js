angular.module('myApp')
.factory('employees', [
	'$http' 
	, function($http ){

  var e = {
    employees: [
    {name: 'ashwin' }
   , {name: 'john' }
    ]
  }; 

  e.getAll = function() {
    return $http.get('/employees.json').success(function(data){
      e.employees.push.apply(e.employees, data); 
      // angular.copy(data, e.employees);
    });
  };

  e.create = function(employee){
    return $http.post('/employees.json', employee).success(function(data){
      e.employees.push(data); 
    });
  };

  // e.update = function(employee

  return e; 
}])
