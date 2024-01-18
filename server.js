const express = require('express');
const path = require('path');

const PORT = 3333;

const app = express();

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});