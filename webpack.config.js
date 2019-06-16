var config = {
  entry: './client/app.js',

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  devServer: {
    inline: true,
    port: 7777
  }
}

module.exports = config;
