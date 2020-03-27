document.addEventListener('DOMContentLoaded', function() {

	if (!getCookie('name')) {  
		do { 
			name = window.prompt("What is your name?") 
		}while( name == null || name == "" );

		setCookie("name", name, 1);
	}



  	var conn = new WebSocket('ws://localhost:8080'); 

	var user_list_container = document.getElementById("user-lists"); 
	var chats_display = document.getElementById("chat");
	
	var chatbox = document.getElementById("user-chat");
	var users_list = [];
 
	conn.onmessage = function(event) { 
 		
 		var data = event.data.substring(1, event.data.length - 1).split(',');
 		insert_chat(data[0], data[1]);

	};

	chatbox.onkeyup = function(e) {

		var msg = this.value.replace(/\n/g, ''); 

	   if (e.keyCode == 13) {  

	     	if (!e.shiftKey && msg !== "") {
 
	     		
			  	conn.send([getCookie('name'), msg]);
			  	insert_chat("me", msg);
	     		this.value = "";

	     	} 

		   return false;
		}
 
	}

	function insert_chat(user, msg) {

		var li = document.createElement("li");
		li.innerHTML = "<b>" + user + ": </b>" +  msg; 
		chats_display.appendChild(li);
	}
 

	function get_time() {
		var currentdate = new Date();
		var hour = currentdate.getHours();
		var meridiem = hour >= 12 ? " PM" : " AM"
		return hour + ":" + currentdate.getMinutes() + meridiem;
	}

 

});