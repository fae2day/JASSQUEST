/*
 *	Phonegap Test App
 *	client.js
 */
 
var Client = function(){
	this.setup();
};

Client.prototype = {
	setup : function(){
		$("div:not(#home)").hide();
		$("#home").show();
		var self = this;
		
		new NotificationPage();
		new CameraPage();
		new EventsPage();
		new ContactsPage();
	
		$("#NotificationButton").on(startEvent, 
			function(){self.loadPage("#NotificationView")});
		$("#ContactsButton").on(startEvent, 
			function(){self.loadPage("#ContactsView")});
			
		$("#BackButton").on(startEvent, function(){
			$("div:not(#home)").hide();
			$("#home").show();
		});
	},
	
	loadPage : function(page){
		$("div:not(#home)").show();
		$("div:not(" + page + ",#Back)").hide();
		$(page + ",#Back").show();
	}
};