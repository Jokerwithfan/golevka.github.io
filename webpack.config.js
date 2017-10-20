const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.join(__dirname, './'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: path.join(__dirname, './src'),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, './src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 8192,
            name: 'assets/img/[name]_[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /onepagescroll\.(min)?\.js$/,
        use: ['exports-loader?onePageScroll', 'script-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.module.rules.push({
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        },
        'sass-loader',
      ],
    }),
  });
  module.exports.output.filename = 'assets/js/[name]_[chunkhash:7].js';
  module.exports.plugins.push(new ExtractTextPlugin('assets/css/[name]_[contenthash:7].css'));
} else {
  module.exports.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer]
        }
      },
      'sass-loader'
    ]
  });
}
