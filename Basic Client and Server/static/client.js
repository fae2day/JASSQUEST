// Functions for communicating with server

// ~~~~USER FUNCTIONS~~~~

// Posts new user. (Creating an account)
function post(username, name){
		var obj = {
      type: "post",
      data: {"username" : username, "name" : name},
      url: "/userList",
      success: function(data) {
				console.log("Post success: ");
				console.log(data);
				// Alert user that new account has been created
			}
    }
		console.log(obj);
	$.ajax(obj);
};

// Gets all users.
function get(){
	 $.ajax({
      type: "get",
      url: "/userList",
      success: function(data) {
				console.log("Get success: ");
				console.log(data);
				//Manip DOM somehow. Not sure what this is for. (leaderboard?)
      }
    });
}

// Gets specified user.
function getUser(username){
	 $.ajax({
      type: "get",
      url: "/userList/" + username,
      success: function(data) {
				console.log("Get success: ");
				console.log(data);
				//Data for profile and quests and friends and stuff.
      }
    });
}


// Updates user info.
function edit(username, data){
	$.ajax({
      type: "put",
      data: {"toChange" : data},
      url: "/userList/" + username,
      success: function(data) { 
				if(data.success){
					//let user know
					console.log("Edit success!");
				}
				else{
					//alert
					console.log("Edit failed!");
				}
			}
    });
}

// Deletes a user.
function remove(username){
	console.log("Deleting " + username);

	$.ajax({
      type: "delete",
      url: "/userList/" + username,
      success: function(data) {
				// alert
			}
    });
}

// ~~~~QUEST FUNCTIONS~~~~
// Gets quest list.


function getQuests(){
	$.ajax({
		type: "get",
		url: "/quests",
		success: function(data) { 
			if(data.success){
				console.log(data);
			}
			else{
				alert("Error! Failed to get quests.");
			}
		}
  });
};

function getCompletedQuests(username){
	$.ajax({
		type: "get",
		url: "/quests/" + username + "/complete",
		success: function(data) { 
			if(data.success){
				//update dom
			}
			else{
				alert("Error! Failed to get quests.");
			}
		}
   });
};

function getIncompleteQuests(username){
	$.ajax({
      type: "get",
      url: "/quests/" + username + "/incomplete",
      success: function(data) { 
				if(data.success){
					//update dom
				}
				else{
					alert("Error! Failed to get quests.");
				}
			}
    });
};

// FOR US ONLY. This should be moved somewhere else later.
// Conditions is an object of whatever you want just because.
// wow i did this weird, standardize later
function postQuest(name, description, type, conditions){
	var obj = {
		type: "post",
		data: {"name" : name, "desc" : description, "quest_type" : type, 
			"success_conditions" : conditions},
		url: "/quests",
		success: function(data) {
			console.log("Post success: ");
			console.log(data);
			// Alert us that quest has been posted.
		}
	}
	console.log(obj);
	$.ajax(obj);
};