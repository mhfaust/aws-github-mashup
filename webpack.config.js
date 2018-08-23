const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const APP_DIR = path.resolve(__dirname, 'src');

const entries = {
  training: './src/entry-training.js',
  engineering: './src/entry-engineering'
}

const babiliPlugin = new BabiliPlugin();
const extractSassPlugin = new ExtractTextPlugin({ filename: "main.css"});

module.exports = (env) => ({
  entry: {
    main: entries[env.AUDIENCE]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/pub'
  },
  module : {

    loaders : [{
      test : /\.jsx?/,
      include : APP_DIR,
      use : 'babel-loader'
    } ,{
      test: /\.scss$/,
      use: extractSassPlugin.extract({
          use: [
            { loader: "css-loader" }, 
            { loader: "sass-loader" }
          ]
      })
    }]
  },  
  resolve: {
    extensions: ['.js', '.scss', '.jsx'],
    alias: {
        ['~']: APP_DIR
    }
  },
  devServer: { 
    inline: true,
    hot: true
  },
  plugins: env.NODE_ENV==='production' ? [babiliPlugin, extractSassPlugin] : [extractSassPlugin]

});