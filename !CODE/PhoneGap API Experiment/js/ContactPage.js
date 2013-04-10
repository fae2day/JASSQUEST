var ContactsPage = function(){
	var self = this;
	
	$("#AllContactsButton").on(startEvent, getEveryone);
	$("#GetContactButton").on(startEvent, function(){getSomeone($("#ContactName").val())});
};

function getEveryone(){
	var options = new ContactFindOptions();
	options.filter="";          // empty search string returns all contacts
	options.multiple=true;      // return multiple results

	navigator.contacts.find(["name", "phoneNumbers"], onSuccess, onError, options);
};

function getSomeone(name){
	var options = new ContactFindOptions();
	options.filter=name;
	options.multiple=true;      // return multiple results
	navigator.contacts.find(["name", "phoneNumbers"], onSuccess, onError, options);
};

function onSuccess(contacts){
		var contactList = $("#ContactList");
		var list = "Contacts found: <br>";
		
		for (var i = 0; i < contacts.length; i++){
			if (!contacts[i].displayName) continue;
		
			list = list + contacts[i].displayName + ": ";
			if(!!contacts[i].phoneNumbers){
				list = list + contacts[i].phoneNumbers[0].value + "<br>";
			}
			else {
				list = list + "No number listed<br>";
			}
		}
		
		contactList.html(list);
};
	
function onError(error){
	alert("Error: Contact Retrieval Failed!" + error);
}