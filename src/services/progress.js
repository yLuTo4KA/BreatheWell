'use strict';

module.exports = {
  async updateCourseProgress() {
    // Получаем всех пользователей
    const users = await strapi.db.query('plugin::users-permissions.user').findMany();

    for (const user of users) {
      const progress = await strapi.db.query('api::course-progress.course-progress').findOne({
        where: { user: user },
        populate: {
            lesson: {
                fields: ['*'],
            },
        }
      });
      console.log(progress)
      if (progress) {
        if (progress && progress.todayComplete && user.premium && progress.lesson_learned) {
          await strapi.db.query('api::course-progress.course-progress').update({
            where: { user: user },
            data: {
              lesson: progress.lesson.id + 1,
              todayComplete: false,
              lesson_learned: false,
              lastComplete: Date.now()
            },
          });
        }
      }
    }
  },
};
