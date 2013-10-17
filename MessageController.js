Chatty.controller("MessageController", function($scope,$http){
	
	$scope.refresh = function(){
		$http.get('http://localhost:8000/').success(function(response){
		$scope.chatMessages = response;
	});
	}

	$scope.refresh();

	$scope.addMessage = function(){
		var message = {
				messageText : $scope.newChat,
				timeCreated : new Date();
			};
		$http.post('http://localhost:8000/', message).success(function() {
				$scope.newChat="";
				$scope.refresh();
			});
	}

});