angular.module('myApp')
.controller('MainCtrl', [
'$scope'
,  'posts'
, function($scope, posts){

  $scope.test = 'Hello!';

  $scope.posts = posts.posts; 

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

} ])
