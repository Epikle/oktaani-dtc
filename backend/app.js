const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const dtcRoutes = require('./routes/dtc-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

//Parses incoming requests with JSON payloads
app.use(express.json());

//Static path
//USE THIS WHEN DEPLOYING APP
//app.use(express.static(path.join('public')));

//CORS - needed if frontend and backend are on different servers
//THIS NEEDED WHILE DEVELOPING APP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

//Routes
app.use('/api/dtc', dtcRoutes);
app.use('/api/user', userRoutes);

//If React in same server with backend this is needed
//USE THIS WHEN DEPLOYING APP
// app.use((req, res, next) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

//Unknown routes - needed if frontend and backend are on different servers
//require HttpError!
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

//Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!',
  });
});

//Starting server if DB connection successful
mongoose
  .connect(process.env.DB_ADDRESS)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
