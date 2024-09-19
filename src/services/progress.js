'use strict';

module.exports = {
  async updateCourseProgress() {
    // Получаем всех пользователей
    const users = await strapi.db.query('api::user.user').findMany();
    
    for (const user of users) {
      const progress = await strapi.db.query('api::course-progress.course-progress').findOne({
        where: { user: user },
      });

      if (progress) {
        if (progress && progress.todayComplete && user.premium) {
          await strapi.db.query('api::course-progress.course-progress').update({
            where: { user: user },
            data: {
              lesson: progress.lesson.id + 1,
              todayComplete: false,
              lastComplete: Date.now()
            },
          });
        }
      }
    }
  },
};
