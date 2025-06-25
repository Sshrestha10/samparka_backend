import express from 'express';
import mongoose from 'mongoose';

import config from './src/config/config.js';
import expressConfig from './src/core/webserver/express.js';
import serverConfig from './src/core/webserver/server.js';
import mongoDbConnection from './src/core/database/mongoDB/connection.js'
import routes from './src/routes/index.js'
import errorHandlingMiddleware from './src/core/webserver/middlewares/error.handling.middleware.js'

const app = express();

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  connectTimeoutMS: 10000,
}).connectToMongo();

// routes for each endpoint
routes(app, express);
// error handling middleware
app.use(errorHandlingMiddleware);

// Expose app
export default app;

//for starting the mongod service in macos please paste this
// sudo /Users/groot/mongodb/bin/mongod --dbpath ~/data/db