var http = require('http');
port = 8000;
var messages = [{messageText:"TACO TIME"}];
http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin': '*'});
	
	var methodType = request.method;
	if (methodType == "GET"){
		response.write(JSON.stringify(messages));
	} else if(methodType == "POST"){
		 var postData = '';
		   request.on('data', function(chunk) {
		    postData += chunk.toString();
		   });
		   request.on('end', function() {
		    messages.push({messageText: JSON.parse(postData)});
		    console.log(messages);
		   });
		}
	response.end();

}).listen(port);