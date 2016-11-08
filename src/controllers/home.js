RestaurantApp.controller('homeController', function($scope, $rootScope, $location, Restaurants, $timeout) {
	
	$scope.getRestaurants = function(filter){
		if(filter === undefined) filter = {};

		Restaurants.get({}, function(restaurants){
			$scope.restaurants = [];

			var temp = [];
			for(var key in restaurants){
				if(typeof restaurants[key] === 'object' && key != "$promise"){
					if(JSON.stringify(filter) === '{}'){
						temp.push(restaurants[key]);
					} else if(restaurants[key].City === filter.City || restaurants[key].Cuisine === filter.Cuisine){
						temp.push(restaurants[key]);
					}				
				}			
			}
			$timeout(function(){
				$scope.$apply(function() {
					$scope.restaurants = temp;
					console.log($scope.restaurants);
				});
			}, 10)
		});
	}

	$scope.getRestaurants();

	$scope.moreDetails = function(restaurant){
		$rootScope.restaurant = restaurant;
		$location.path('restaurant');
	}

	$('.dropdown').on('show.bs.dropdown', function(event) {
	    var dropdown = $(event.target);
	    
	    dropdown.find('.dropdown-menu').attr('aria-expanded', true);
	    
	    setTimeout(function() {
	        dropdown.find('.dropdown-menu li:first-child a').focus();
	    }, 1000);
    });

	$('.dropdown').on('hidden.bs.dropdown', function(event) {
	    var dropdown = $(event.target);

	    dropdown.find('.dropdown-menu').attr('aria-expanded', false);
	    
	    dropdown.find('.dropdown-toggle').focus();
	});

});

