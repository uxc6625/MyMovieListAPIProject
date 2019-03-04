const users = []; // Object list of users
let userNum = -1; // Starting number

// Stringifying an object from another function response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Meta version of respondJSON
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Provide a list of users, GET Request
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Provide a list of users, HEAD request
const headUsers = (request, response) => respondJSONMeta(request, response, 200);

// Adding a user 
const addUser = (request, response, body) => {
  userNum += 1;

  // Pre-existing message
  const responseJSON = {
    message: 'Name and movie are required.',
  };

  // If name and movie aren't provided, then request then to do so
  if (!body.name || !body.movie) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  let index = userNum; // another variable linked to userNum
  users[index] = {};


  users[index].name = body.name;
  users[index].movie = body.movie;
  users[index].year = body.year;
  users[index].genre = body.genre;
  users[index].image = body.image;



  if (responseCode === 201) {
    responseJSON.message = `Added ${users[index].movie} for ${users[index].name}`;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// If a client is searching for another page in our directory that doesn't exist,
// it will respond with this
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  headUsers,
  addUser,
  notFound,
};
