angular.module('myApp')
.factory('posts', [
	'$http',
  '$q'
	, function($http, $q){
  var o = {
    posts: []
  }; 
   
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post){ 
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data); 
    }); 
  }; 

  o.upvote= function(post){
    return $http({
      method: 'PUT',
      url: '/posts/' + post.id + '/upvote.json'
    })
    .success(function(data){
      post.upvotes += 1 ; 
    }); 

  }; 

  return o; 
}])

