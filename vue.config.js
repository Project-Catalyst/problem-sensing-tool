let publicPath = ''
if (process.env.NODE_ENV === 'production') {
  publicPath = '/problem-sensing-tool/'
}
if (process.env.NODE_ENV === 'staging') {
  publicPath = '/'
}
if (process.env.NODE_ENV === 'development') {
  publicPath = '/'
}
module.exports = {
  publicPath: publicPath
}