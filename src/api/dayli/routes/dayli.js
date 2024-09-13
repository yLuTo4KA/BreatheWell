
module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'GET',
        path: '/auth/dayli-check', // Only match when the URL parameter is composed of lowercase letters
        handler: 'dayli.dayliCheck',
      }
    ]
  }