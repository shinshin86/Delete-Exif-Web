import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

function renderFullPage(renderedContent) {
  return `<!DOCTYPE html>
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
    <div id="root">${renderedContent}</div>
    <script src="/bundle.js"></script>
  </body>
</html>`;
}

export default function(req, res) {
  const renderedContent = renderToString(<App />);
  const renderedPage = renderFullPage(renderedContent);
  res.status(200).send(renderedPage);
}
