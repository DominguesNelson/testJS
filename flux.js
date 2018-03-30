var socket = io.connect('http://127.0.0.1:8000');
   	socket.on('numerama', function(json) {
			console.log("numerama");
			console.log(json);
			$("<li></li>").html(json)
   		});