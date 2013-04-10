var NotificationPage = function(){
	$("#NotificationAlert").on(startEvent, this.alert);
	$("#NotificationConfirm").on(startEvent, this.confirm);
	$("#NotificationBeep").on(startEvent, this.beep);
	$("#NotificationVibrate").on(startEvent, this.vibrate);
}

NotificationPage.prototype = {
	alert: function(){
		navigator.notification.alert("Alert!", 
			function(){
				$("#NotificationText").text("Alert button pressed!");
			});
	},
	
	confirm: function(index){
		navigator.notification.confirm("Confirm!", 
			function(){
				$("#NotificationText").text("Confirm button pressed! You pressed button" 
					+ index);
			});
	},
	
	beep: function(){
		navigator.notification.beep(2);
		$("#NotificationText").text("Beep beep!");
	},
	
	vibrate: function(){
		navigator.notification.vibrate(3000);
		$("#NotificationText").text("I am vibrating!!");
	}
}