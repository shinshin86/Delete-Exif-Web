const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const ReactServer = require('./public/server.js').default;

const express = require('express');
const app = new express();
const port = 3000;
app.use(express.static('public'));

const publicPath = path.join(__dirname, 'public');

// config[0] === browserConfig ==> TODO
const compiler = webpack(config[0]);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath
  })
);
app.use(webpackHotMiddleware(compiler));

app.use('/', (req, res, next) => {
  ReactServer(req, res);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('*** Listening on port %s ***', port);
  }
});
