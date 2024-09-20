const { updateCourseProgress } = require("../src/services/progress");

module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
  
    "*/0 14 19 * * *": async ({ strapi }) => {
      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
      try {
        await updateCourseProgress();
      }catch(e) {
        console.log('not upload!');
      }
    },
  };