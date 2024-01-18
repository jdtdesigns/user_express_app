const express = require('express');
const path = require('path');

const PORT = 3333;

const app = express();

// GET Route - Listening for the client to visit localhost:3333/test
app.get('/test', (requestObj, responseObj) => {
  responseObj.send('Hi from the server!');
});

app.get('/', (requestObj, responseObj) => {
  responseObj.send('root visited');
});

app.get('/api/recipe', (requestObj, responseObj) => {
  responseObj.send({
    name: 'Mac & Cheese',
    ingredients: ['cheese', 'pasta', 'heavy cream']
  });
});

app.get('/page', (requestObj, responseObj) => {
  responseObj.sendFile(path.join(__dirname, './index.html'));
});

app.use((requestObj, responseObj) => {
  responseObj.sendFile(path.join(__dirname, './notfound.html'));
});

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});