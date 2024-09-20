
module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'GET',
        path: '/course-progresses', // Only match when the URL parameter is composed of lowercase letters
        handler: 'course-progress.find',
      },
      {
        method: 'POST',
        path: '/complete-task',
        handler: 'course-progress.completeTask'
      }
    ]
  }