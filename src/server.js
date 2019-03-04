const http = require('http'); // Grabbing http info

const url = require('url'); // Grabing url info

const query = require('querystring'); // Query for clients

const htmlHandler = require('./htmlResponses.js'); // JS file to handle html responses
const jsonHandler = require('./jsonResponse.js'); // JS file to handle JSON responses

// Port number
const port = process.env.PORT || process.env.NODE_PORT || 5500;

// Handling the POST request
const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addUser') {
    const res = response;

    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

// Handling the GET request
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notFound(request, response);
  }
    else if (request.url === '/background.jpg') {
      htmlHandler.getBackgroundImage(request,response);
  } 
  else if (request.url === '/logo.png') {
    htmlHandler.getLogoImage(request,response);    
} 
else if (request.url === '/logo1.png') {
  htmlHandler.getHeaderImage(request,response);    
} 
  else {
    htmlHandler.getIndex(request, response);
  }
};

// Handling the HEAD request
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.headUsers(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notFound(request, response);
  }
  else if (request.url === '/background.jpg') {
    htmlHandler.getBackgroundImage(request,response); 
} 
else if (request.url === '/logo.png') {
  htmlHandler.getLogoImage(request,response); 
} 
else if (request.url === '/logo1.png') {
  htmlHandler.getHeaderImage(request,response);    
} 
  else {
    htmlHandler.getIndex(request, response);
  }
};

// Resorting to other handle requests upon request
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);


  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  }

};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
