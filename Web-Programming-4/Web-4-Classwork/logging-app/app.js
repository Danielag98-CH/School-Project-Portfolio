const express = require('express');
const app = express();
const port = 3000;

// Set up the logging (note that the errorLogStream is used below in the error handler)
const {setUpLogging, errorLogStream} = require('./logger');
setUpLogging(app);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us...' + x);
});

app.use((err, req, res, next) => {

  const errorDetails = `
    Time: ${new Date().toISOString()}
    Method: ${req.method}
    URL: ${req.originalUrl}
    Message: ${err.message}
    Stack: ${err.stack}
  `;

  // In production: log the error details to the error log file
  errorLogStream.write(errorDetails);
  // In dev: log the error details to the console
  console.error(errorDetails);

  // Respond with a generic error message
  res.status(500).send('Internal Server Error');

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});