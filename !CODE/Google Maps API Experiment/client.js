/*
 * client.js
 * 
 * Features:
 *		-Display Google Map and current location
 *
 * Currently Being Implemented:
 *		None yet!
 *		
 * To Implement Later:
 *		None yet!
 */
 
 /*
		Personal Notes
			-CLEAN UP YOUR CODE
			-verify data on client-side before sending to server.
			-confirm deletion on client-side
			-implement authentification? or just use FB
			-see https://piazza.com/class#spring2013/15237/398 for structure
 */
 
// client.js object. 
function Client(){
	//Initialize the client-side. (maybe put in load.js?)
	//init
	if (!window.navigator.geolocation){
		alert("No geolocation detected!");
		return;
	}
	
	//Hard-coded markers. These will be replaced by the coordinates
	//of other currently in-game users.
	var markerOptions = [
		{position: new google.maps.LatLng(40.4469858, -79.95125639999999), title: "Webster Apartments"},
		{position: new google.maps.LatLng(40.448486,-79.947002), title: "Cathedral Mansions"},
		{position: new google.maps.LatLng(40.443542,-79.944506), title: "Gates Hillman Center"}
		
	];
	
	//Get the user's location.
	navigator.geolocation.getCurrentPosition(getLoc);
	
	
	function getLoc(position){
		var markers = [];
		var mapOptions = {
			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		//Get Google Map, load it, and center it on user.
		var map = new google.maps.Map($("#mapCanvas")[0],
            mapOptions);
						
		//Load user marker.
		markers.push(new google.maps.Marker({
			position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			map: map,
			title:"You",
			animation: google.maps.Animation.BOUNCE,
			icon: "images/poyoblue.png"
		}));
		
		//Load other markers.
		for (var i = 0; i < markerOptions.length; i++){
			markers.push(new google.maps.Marker({
					position: markerOptions[i].position,
					map: map,
					title: markerOptions[i].title,
					icon: "images/poyopink.png",
					animation: google.maps.Animation.DROP
				})
			);
		};
		
	};
	
	// getPlayerData(id): Retrieves player data from server with id.
	function getPlayerData(id){
	};
	
	// updatePlayerData(newPlayerData): Updates player data. (Maybe not
	// send ALL the data every time? Might only need to update a few things.)
	// Consider spliting this into different functions.
	function updatePlayerData(newPlayerData){
	};
	
 };