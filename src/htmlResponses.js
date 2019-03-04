const fs = require('fs'); // grabbing file

const index = fs.readFileSync(`${__dirname}/../client/client.html`); // grabbing info from client html
const css = fs.readFileSync(`${__dirname}/../client/style.css`); // grabbing info from client css
const backgroundImage = fs.readFileSync(`${__dirname}/../client/image/background.jpg`); // grabbing info from client css
const logoImage = fs.readFileSync(`${__dirname}/../client/image/logo.png`); // grabbing info from client css
const headerImage = fs.readFileSync(`${__dirname}/../client/image/logo1.png`); // grabbing info from client css



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

const getBackgroundImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(backgroundImage);
  response.end();
};

const getLogoImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(logoImage);
  response.end();
};

const getHeaderImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(headerImage);
  response.end();
};
module.exports = {
  getIndex,
  getCSS,
  getBackgroundImage,
  getLogoImage,
  getHeaderImage,
};
