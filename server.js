var http = require('http');
port = 8000;
var messages = [{messageText:"TACO TIME"}];
http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
	
	var methodType = request.method;
	if (methodType == "GET"){
		response.write(JSON.stringify(messages));
	} else if(methodType == "POST"){
		 var postData = '';
		   request.on('data', function(chunk) {
		    postData += chunk.toString();
		   });
		   request.on('end', function() {
		    messages.push(JSON.parse(postData));
		   });
	} else if (methodType == "OPTIONS"){
		response.writeHead(200,
			{
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		)
	}
	response.end();

}).listen(port);