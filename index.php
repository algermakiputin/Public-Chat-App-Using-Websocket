<!DOCTYPE html>
<html>
<head>
	<title>Simple Chat</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<header>
		<h3>JUST CHAT APP - A simple PHP chatting application using Socketo.io</h3>
	</header>
	<aside >
		<h3>Connected Users</h3>
		<ul id="user-lists">
			<li>User1</li>
			<li>User2</li>
			<li>User3</li>
			<li>User4</li>
		</ul>
	</aside>
	<main> 
		<div class="messages-box">
			<div class="container">
				<ul id="chat">
					<li><span class="chat">User1 says: Hello World</span></li>
					<li><span class="mychat">User1 says: Hello World</span></li> 
					<li><span class="chat">User1 says: Hello World</span></li>
					<li><span class="mychat">User1 says: Hello World</span></li> 
				</ul>
			</div>
		</div>
		<div class="send-message-box">
			<textarea class="container" name="user-chat" id="user-chat" rows="3" value=""></textarea>
		</div>
	</main> 
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vquery/5.0.1/v.min.js"></script>
	<script type="text/javascript" src="websocket.js"></script>
</body>
</html>