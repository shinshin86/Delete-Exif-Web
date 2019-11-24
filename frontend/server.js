var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));

// create index.html
const createHtml = () => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css"
    />
    <title>Delete Exif Web</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="/static/bundle.js"></script>
  </body>
</html>`;

app.use('/', (req, res, next) => {
  const view = createHtml();
  res.status(200).send(view);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('*** Listening on port %s ***', port);
  }
});
