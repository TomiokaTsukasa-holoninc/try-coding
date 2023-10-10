const path = require('path');
const public_path = path.resolve(__dirname, 'public');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const generatorFilename = pathData => {
  return pathData.filename.split('src/assets/')[1];
}

module.exports = {
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: public_path,
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.css'
    }),
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template : './src/template/index.ejs',
			minify: false,
		})
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: 'defaults'}]
              ]
            }
          }
        ]
      },
      {
				test: /\.ejs$/i,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false
						},
					},
					{
						loader: 'ejs-plain-loader'
					}
				]
			},
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff2?|ttf|eot)$/,
        type: 'asset',
        generator: {
          filename: generatorFilename
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: generatorFilename
        },
      },
      {
        test: /\.(mov|mp4|mp3|wav)$/,
        type: 'asset',
        generator: {
          filename: generatorFilename
        }
      }
    ]
  }
}
