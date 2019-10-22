document.addEventListener('DOMContentLoaded', function() {

	var user_list_container = document.getElementById("user-lists"); 
	var user_chats = document.getElementById("chat");
	var conn = new WebSocket('ws://localhost:8080'); 
	var chatbox = document.getElementById("user-chat");
	var new_user = "";

	conn.onopen = function(e) {
		var min = e.timeStamp;
		var max = 9999;
  		user_id  = (Math.floor(Math.random() * (max - min)));	
  		new_user = "user" + user_id;

	   console.log("Connection established!");
	   
	};

	conn.onmessage = function(event) { 

		 var result = JSON.parse(event.data);
	 		
		 insert_chat(result.msg, 'chat', result.user, "text-left");
 	
	};

	chatbox.onkeyup = function(e) {
		var chat_message = this.value.replace(/\n/g, ''); 
	   if (e.keyCode == 13) {  

	     	if (!e.shiftKey && chat_message !== "") {
	     		
			  	var sender = new_user; 

	     		conn.send(JSON.stringify({
	     			'msg': chat_message,
	     			'time': get_time(),
	     			'user': new_user
	     		}));

	     		insert_chat(chat_message, 'mychat', sender ,'text-left');
	     		this.value = "";
	     	}
		          
		   return false;
		}
 
	}

	function insert_chat(msg, class_name, user, right = '') {
		var new_chat_li = document.createElement('li');
		new_chat_li.className = right;
		new_chat_li.innerHTML = user + ', ' + get_time() + '</br><span class="'+class_name+'">'+msg+'</span>';
		user_chats.appendChild(new_chat_li);
	}

	function get_time() {
		var currentdate = new Date();
		var hour = currentdate.getHours();
		var meridiem = hour >= 12 ? " PM" : " AM"
		return hour + ":" + currentdate.getMinutes() + meridiem;
	}

});