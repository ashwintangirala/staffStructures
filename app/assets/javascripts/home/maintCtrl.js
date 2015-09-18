
angular.module('myApp')
.controller('MainCtrl', [
'$scope' 
,  'posts' 
, 'teams'
, 'employees'
, function($scope, posts, teams, employees){
  $scope.test = 'Hello!';

  $scope.teams = teams.teams; 

  $scope.employees = employees.employees; 
  // $scope.addPost = function(){  
	 // if(!$scope.title || $scope.title === '') { return; }
	 //  $scope.posts.push({
	 //    title: $scope.title,
	 //    link: $scope.link,
	 //    upvotes: 0
  //     , comments: [
  //     {author: 'bob', body:'great writing', upvotes: 0}
  //     , {author: 'jerry', body: 'great idea!', upvotes: 0}
  //     ]
	 //  });
	 //  $scope.title = '';
	 //  $scope.link = '';; 
  // }; 

  $scope.addEmployee = function(){  
   if(!$scope.emp_name || $scope.emp_name === '') { return; }
  employees.create({
    name: $scope.emp_name   
  }); 
  $scope.emp_name = '';  
  }; 

  $scope.addTeam = function(){ 
   if(!$scope.name || $scope.name === '') { return; }
  teams.create({
    name: $scope.name   
  }); 
  $scope.name = '';  
  };   

  $scope.addPost = function(){  
   if(!$scope.title || $scope.title === '') { return; }
  posts.create({
    title: $scope.title, 
    link: $scope.link, 
  }); 
  $scope.title = ''; 
  $scope.link = ''; 
  }; 

$scope.incrementUpvotes = function(post) {
  posts.upvote(post); 
};

}])

