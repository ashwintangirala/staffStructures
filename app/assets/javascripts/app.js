angular.module('myApp',  ['ui.router', 'templates'])
.config([
  '$stateProvider'
  , '$urlRouterProvider'
  , function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state( 'home', {
        url: '/home'
        , templateUrl: '/home.html'
        , controller: 'MainCtrl'
      })  
    .state('posts', {
      url: '/posts/{id}'
      , templateUrl: '/posts.html'
      , controller: 'PostsCtrl'
    }); 

    $urlRouterProvider.otherwise('home') ;

  }])
.controller('PostsCtrl', [
  '$scope'
  , '$stateParams'
  , 'posts'
  , function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id]; 

    $scope.addComment = function(){ 
      if (!$scope.body || $scope.body === '') {return; }
        $scope.post.comments.push({
          body: $scope.body 
          , author: 'user'
          , upvotes: 0
        })     
      $scope.body = '';   
    }; 

  }])
.controller('MainCtrl', [
'$scope'
,  'posts'
, function($scope, posts){

  $scope.test = 'Hello!';

  $scope.posts = posts.posts; 

  $scope.addPost = function(){  
	 if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    link: $scope.link,
	    upvotes: 0
      , comments: [
      {author: 'bob', body:'great writing', upvotes: 0}
      , {author: 'jerry', body: 'great idea!', upvotes: 0}
      ]
	  });
	  $scope.title = '';
	  $scope.link = '';; 
  }; 

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};  

}  
]) 
.factory('posts', [function(){
  var o= {
    posts: []
  }; 
  return o; 
}])





