module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
      modules: [
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' //for handling Boostrap fonts 
        }
      ]
    }
}
