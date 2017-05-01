// search function: take the search term, make the API call
function search(){
event.preventDefault();
var query = $("#searchInput").val();
// url + result of query function where user entered location + instruction to return data in 'json' format
$.ajax({
	url:'http://beermapping.com/webservice/loccity/1d0dec692e53fe232ce728a7b7212c52/'+ query +'&s=json',
	method: 'GET',
	dataType: 'json',
	success: function(data){
		handleSearchResults(data);
	},
	error: function(data){
		console.log(data);
	}
});

}
// filtering out just the resuts that are of type = brewery
function handleSearchResults(result){
	var breweries = result.filter(function(el){
		return el.status === "Brewery";
});
// entering part of html page that has id=results and emptying it; going through each of the breweries
$('#results').empty();
	$.each(breweries, function(index){
		// where id=results, add ("append") this html code; with every brewery it finds, putting it on the html page with a button next to it
		var breweryId = breweries[index].id;
		$('#results').append('<div class="row"><div class="col-md-8"><p>' + breweries[index].name + 
			'</p></div><div class="col-md-4"><input class="mapShow" type="button" value="Show on Map" onclick="getBreweryLatLng('
			+breweryId+')" /></div></div>');
});
}

// calls google map  
var map;
function initMap(){
map = new google.maps.Map(document.getElementById('map'), {
	zoom: 4, 
	center: {'lat': 0, 'lng': 0}
});
}

// make an API call to a google location with the breweryId, give them an address, they give us a lat + long (function placeMarker)
function getBreweryLatLng(breweryId){
$.ajax({
	url:'http://beermapping.com/webservice/locmap/1d0dec692e53fe232ce728a7b7212c52/'+ breweryId +'&s=json',
	method: 'GET',
	dataType: 'json',
	success: function(data){
		placeMarker(Number(data[0].lat), Number(data[0].lng));
},
	error: function(data){
		console.log(data);
	}
});
}

// function places markers on our map; give the lat + lng of location and puts it on the map; also moves map to that location
function placeMarker(lat, lng){
	new google.maps.Marker({
		position: {lat, lng},
		map: map
	});
	map.panTo({lat, lng});
	map.setZoom(13);
}