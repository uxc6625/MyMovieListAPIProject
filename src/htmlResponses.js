const fs = require('fs'); // grabbing file

const index = fs.readFileSync(`${__dirname}/../client/client.html`); // grabbing info from client html
const css = fs.readFileSync(`${__dirname}/../client/style.css`); // grabbing info from client css

// Gets html file and writes it
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Gets css file and writes it
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
};
