document.addEventListener('DOMContentLoaded', function() {

	var user_list_container = document.getElementById("user-lists"); 
	var user_chats = document.getElementById("chat");
	var conn = new WebSocket('ws://localhost:8080'); 
	var chatbox = document.getElementById("user-chat");

	conn.onopen = function(e) {
 
	   console.log("Connection established!");
	   
	};

	conn.onmessage = function(event) { 
		 var new_chat_li = document.createElement('li');
		 var result = JSON.parse(event.data);
		 new_chat_li.innerHTML = '<span class="chat">User1 says: '+result.msg+'</span>';

		 user_chats.appendChild(new_chat_li);
 	
	};

	chatbox.onkeyup = function(e) {
		

	   if (e.keyCode == 13) {  

	     	if (!e.shiftKey) {
	     		var chat_message = this.value.replace(/\n/g, '');
			  
	     		conn.send(JSON.stringify({'msg': chat_message}));
	     		this.value = "";
	     	}
		          
		   return false;
		}
 
	}

});