var express = require("express");
var app = express();
var port = 8000;
var messages = [{"messageText": "Taco Time!"}];

// this automatically does the chunking stuff
app.use(express.bodyParser());
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get("/", function(req,res){
	res.send(JSON.stringify(messages));
});

app.post("/", function(req,res){
   	var message =req.body;
   	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
   	message.createTime = today;
    messages.push(message);
	res.send(messages);	   
});

app.listen(port);

// http.createServer(function(request,response){
// 	response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
	
// 	var methodType = request.method;
// 	if (methodType == "GET"){
// 		response.write(JSON.stringify(messages));
// 	} else if(methodType == "POST"){
// 		 var postData = '';
// 		   request.on('data', function(chunk) {
// 		    postData += chunk.toString();
// 		   });
// 		   request.on('end', function() {
// 		   	var message =JSON.parse(postData);
// 		   	message.createTime = new Date();
// 		    messages.push(message);
// 		   });
// 		   console.log(messages);
// 	} else if (methodType == "OPTIONS"){
// 		response.writeHead(200,
// 			{
// 				'Access-Control-Allow-Origin': '*',
// 				'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
// 				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
// 			}
// 		)
// 	}
// 	response.end();

// }).listen(port);