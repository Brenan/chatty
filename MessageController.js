Chatty.controller("MessageController", function($scope,$http){
	$http.get('http://localhost:8000/').success(function(response){
		$scope.chatMessages = response.messages;
	})

});