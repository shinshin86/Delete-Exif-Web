const isProduction = process.env.NODE_ENV === 'production';

const browserConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/browser.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  }
};

const serverConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/server.js',
  target: 'node',
  output: {
    path: __dirname,
    filename: './public/server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals'
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  }
};

module.exports = [browserConfig, serverConfig];
