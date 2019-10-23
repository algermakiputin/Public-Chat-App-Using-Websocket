document.addEventListener('DOMContentLoaded', function() {

	if (!getCookie('user'))  
		create_user();

	var user_list_container = document.getElementById("user-lists"); 
	var user_chats = document.getElementById("chat");
	var conn = new WebSocket('ws://localhost:8080'); 
	var chatbox = document.getElementById("user-chat");
	var user = getCookie("user");
	var users_list = [];

  
	conn.onopen = function(e) {
 		 
  		conn.send(JSON.stringify({
  			'type': 'new_connection',
  			'user': user,
  		})); 
	   
	};

	conn.onmessage = function(event) { 

		var result = JSON.parse(event.data);
	  
		if (result.type == "chat") {

			if (!users_list.includes(result.user))
		 		insert_chat(result.msg, 'chat', result.user, "text-left");
		 	
		}else if (result.type == "new_connection") {

			if (!users_list.includes(result.user)) { 
				insert_user(result.user);
			}
			
		}else if (result.type == "user_list") {
			console.log(result);
			result.users.forEach( function(value) {
				if (value.id !== user)
					insert_user(value.id);
			});

		}


 	
	};

	chatbox.onkeyup = function(e) {
		var chat_message = this.value.replace(/\n/g, ''); 
	   if (e.keyCode == 13) {  

	     	if (!e.shiftKey && chat_message !== "") {
	     		
			  	var sender = user; 

	     		conn.send(JSON.stringify({
	     			'msg': chat_message,
	     			'time': get_time(),
	     			'user': user,
	     			'type': 'chat',
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

	function create_user() {
		var min = 0;
		var max = 9999;
		user_id  = (Math.floor(Math.random() * (max - min)));	
		user = "user" + user_id;   
		setCookie('user', user, 1);
		 
	}

	function insert_user(user_name) {
		var new_user_li = document.createElement("li"); 
		new_user_li.innerHTML = user_name; 
		user_list_container.appendChild(new_user_li);
	 
		users_list.push(user_name);
	}

});