RestaurantApp.controller('restaurantController', function($scope, $rootScope, Reviews, UpdateReviews) {

	$scope.restaurant = $rootScope.restaurant;

	$scope.getReviews = function(){
		$scope.reviews = Reviews.query({ name: $scope.restaurant.Name }, function(){

			var final = 0;
			$scope.reviews.forEach(function(rating){
				final += parseInt(rating.Stars);
			});
			$scope.final = Math.round(final / $scope.reviews.length);
		});
	}

	$scope.getReviews();

	$scope.addReview = function(){

		var Review = {
			Name: $scope.name,
			Date: Date($scope.rdate),
			Comment: $scope.comment,
			Stars: $scope.stars
		}

		$scope.newReview = UpdateReviews.get({ name: $scope.restaurant.Name }, function() {
		  console.log($scope.newReview);

		  if($scope.newReview.Reviews === undefined) $scope.newReview.Reviews = ['Review1'];
		  	
		  $scope.newReview.Reviews.push(Review);
	  
		  $scope.newReview.$update({name: $scope.restaurant.Name}, function() {
		  	$scope.getReviews();
		  	$scope.name = '';
			$scope.rdate = '';
			$scope.comment = '';
			$scope.Stars = '';
		  });
		});
	}
	
});
