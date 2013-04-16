/*
 * server.js
 * 
 * Features:
 *		-Express server
 *
 * Currently Being Implemented:
 *		-mongojs
 *		
 * To Implement Later:
 *		-Socket.io server
 *		-communications with client
 */
 
 /*
		Personal Notes
			-get random users?
 */

var express = require("express");
var url = require("url");

/** mongojs:
			A driver which emulates the official mongodb API as much
			as possible.
			
			Source: https://github.com/gett/mongojs
 **/
// Location of the MongoHQ database. The database is defined by the
// environment variable MONGOHQ_URL if it exists. Otherwise, it is 
// hosted locally.
var mongoUri = process.env.MONGOHQ_URL || 
  'mongodb://localhost/mydb'; 

// Array of collections to use in the database.
var collections = ["users", "quests"];
// The database we will be using to store data.
var db = require("mongojs").connect(mongoUri, collections);
	
// Set up express server to communicate with clients.
// **CHANGE TO SOCKET SERVER**
var app = express();

//Use a body parser to handle client requests.
app.use(express.bodyParser());

// Server listens on this port.
var port = process.env.PORT || 5000;

// IGNORE THIS- This is just to see what's in the database.
app.get('/', function(request, response) {
  db.users.find({}).toArray(function(err, users) {
		if(err) 
			response.send({"success" : false});
		else 
			response.send({"users" : users, "success" : true});
	});
});

/* 
 *	Gets the entire list of users.
 *		Gives: [{username : username1, exp : exp1, etc...} ...]
*/
app.get('/userList', function(request, response) {
  db.users.find({}).toArray(function(err, users) {
		if(err) {
			response.send({"success" : false});
		}
		else {
			response.send({"users" : users, "success" : true});
			}
	});
});

/* 
 *	Gets the user "username".
 *		Gives: {username : username, exp : exp, etc...}
*/
app.get('/userList/:username', function(request, response) {
	console.log("Getting username...");
  db.users.find({"username" : request.params.username}, 
		function(err, user) {
			if(err) 
				response.send({"success" : false});
			else 
				response.send({"user" : user, "success" : true});
	}).limit(1);
});

/* 
 *	Creates a new user.
 *		Takes: {username, name}
 *		Gives: {username : username, exp : exp, etc...}
*/
app.post("/userList", function(request, response) {
	console.log("Server posting..");
	
	var username = request.body.username;
	
	db.users.save({"username" : username, "name" : request.body.name}, 
		function(err, result){
			if (err)
				response.send({success : false});
			else{
				// Respond to client with the updated user.
				var userData = db.users.find({"username" : username},
					function(err, user){
						// respond with success and updated 
						if (err) response.send({"success" : false});
						else response.send({"user" : user, "success" : true});
					}).limit(1);
			};
		});
});

/* 
 * Updates user data.
 *		Takes: {username, toChange}
 *		Gives: {username : username, exp : exp, etc...}
 *
 *		Note: toChange = {name : newName, exp : newExp, etc...}
*/
app.put("/userList/:username", function(request, response) {
	console.log("Server putting..");
	var username = request.params.username;
	
	db.users.update({"username" : username}, {$set : request.body.toChange}, 
		function(err, result){
			if (err){
				// respond with unsuccessful
				response.send({"success" : false});
			}
			else{
				// Respond to client with the updated user.
				var userData = db.users.find({"username" : username},
					function(err, user){
						// respond with success and updated 
						if (err) response.send({"success" : false});
						else response.send({"user" : user, "success" : true});
					}).limit(1);
			}
		});
});

/* 
 *  Deletes a user. (Confirmed by user on client-side.)
 *		Takes: {username}
 *
*/
app.delete("/userList/:username", function(request, response){
	var username = request.params.username;
	
	db.users.remove({user : username}, function(err){
		if (err) response.send({"success" : false});
		else response.send({"success" : true});
	});
});

/*
 * Gets all quests.
 */
 app.get("/quests", function(request, response){
	var username = request.params.username;
	
	//Filter by the ones user hasn't completed yet.
	db.quests.find({}, function(err, quests){
		if (err){
			response.send({"quests" : quests, "success" : false});
		}
		else{
			response.send({"quests" : quests, "success" : true});
		}
	});
});

/*
 * Gets all quests completed by a user.
 */
app.get("/quests/:username/complete", function(request, response){
	var username = request.params.username;
	
	//Filter by the ones user hasn't completed yet.
	db.users.find({"username" : username}, function(err, user){
		db.quests.find({}, function(err, quests){
			if (err){
				response.send({"success" : false});
			}
			else{
				var completedQuests = [];
				quests.forEach(function(aQuest){
					// Check in the user's questlog if the quest has been completed.
					if(user.questLog[aQuest.id]){
						completedQuests.push(aQuest);
					}
				});
				response.send({"quests" : completedQuests, "success" : true});
			}
		});
	});
});

/*
 * Gets all quests not yet completed by a user.
 */
app.get("/quests/:username/incomplete", function(request, response){
	var username = request.params.username;
	
	//Filter by the ones user hasn't completed yet.
	db.users.find({"username" : username}, function(err, user){
		db.quests.find({}, function(err, quests){
			if (err){
				response.send({"success" : false});
			}
			else{
				var completedQuests = [];
				quests.forEach(function(aQuest){
					// Check in the user's questlog if the quest has been completed.
					if(user.questLog[aQuest.id] !== undefined && 
					user.questLog[aQuest.id] === 0){
						completedQuests.push(aQuest);
					}
				});
				response.send({"quests" : completedQuests, "success" : true});
			}
		});
	});
});

/* 
 *	Creates a new quest.
*/
app.post("/quests", function(request, response) {
	console.log("Server posting quest..");
	
	var name = request.body.name;
	var desc = request.body.desc;
	var type = request.body.quest_type;
	var conditions = request.body.success_conditions;
	
	db.quests.find({}, function(err, questList){
		var id = questList.length;
	
		db.quests.save({"id" : id, "name" : name, "desc" : desc,
			"type" : type, "success_conditions" : conditions}, 
			function(err, result){
				if (err)
					response.send({success : false});
				else{
					// Respond to client with the updated user.
					db.quests.find({"id" : id},
						function(err, quest){
							// respond with success and updated 
							if (err) response.send({"success" : false});
							else response.send({"quest" : quest, "success" : true});
						}).limit(1);
				};
			});
		});
});


// Serve files in the static directory.
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

// Don't close the mongo server please.
function serverInit(){
	// Remove all users.
	db.users.remove({}, function(err){});
	// Remove all quests.
	db.quests.remove({}, function(err){});
	
	// Insert the sample user.
	db.users.save({"username" : "SAMPLE", "name" : "Sample Guy", "level" : 1, 
		"guild" : "Computer Science", "exp" : 0, });
	// Insert the sample quest.
};

serverInit();
app.listen(port, function() {
  console.log("Listening on " + port);
});