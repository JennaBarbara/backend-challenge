var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;
  mongoose = require('mongoose'),
  Task = require('./api/models/AppModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/27017');   

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/AppRoutes'); //importing routes
routes(app); //register the route

app.listen(port);

console.log('Ada Support Challenge is running on: http://localhost:' + port + '/');
