var path = require('path');
var webpack = require('webpack');
var apps = require("./apps")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'
var entries = {
}
apps.forEach(function(app){
  entries[app] = [
    path.join(__dirname, '/src/apps/'+app)
  ]  
  !isProduction && entries[app].unshift(
    'webpack-hot-middleware/client?reload=true')  
})
console.log(entries)

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devtool:"eval",
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static'
  },
  resolve: {
    extensions:[".js", ".ts", ".tsx", ".webpack.js", ".web.js", ".scss"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    })
  ],
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        include: [path.join(__dirname, 'src'),path.join(__dirname, 'theming')]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loaders: [
          'file-loader?name=[path][name].[ext]'
        ],
        include: path.join(__dirname, 'theming')
      }
    ]
  }
};
