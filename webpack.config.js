const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode : 'development',
  devtool : 'source-map',
  watch:true,
  output: {
    strictModuleErrorHandling: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  stats:{
    errors : true,
    errorDetails : true,
    errorStack : true
  } 
};
