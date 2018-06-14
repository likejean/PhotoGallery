var http = require("http"); //HTTP module 
var fs = require("fs"); // File System module for accessing file system. 
//Using fs, we can perform CRUD operations over files and directories. It contains both synchronous and asynchronous APIs for talking to the file system.
 
http.createServer(function(request, response) {
    //let serve the page index.html page only...
    if(request.url === "/QUEUE"){
        fs.readFile("QUEUE.html", function (err, data) {
            if(err){
                response.writeHead(404);
                response.write("Not Found!");
            }
            else{           
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            }
        });
    }
    
    // modify the server.js file to serve this file whenever it finds a request for the CSS file.

    else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
        sendFileContent(response, request.url.toString().substring(1), "text/css");
	}

	// modify the server.js file to serve this file whenever it finds a request for the additional Javascipt file.
	
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}  

    //otherwise, if http://localhost:3000/index.html is not in use, have some default content...
    else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
        response.end();
    }

    function sendFileContent(response, fileName, contentType){
        fs.readFile(fileName, function(err, data){
            if(err){
                response.writeHead(404);
                response.write("Not Found!");
            }
            else{
                response.writeHead(200, {'Content-Type': contentType});
                response.write(data);
            }
                response.end();
        });
    }


}).listen(3000);
