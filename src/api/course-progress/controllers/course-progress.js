'use strict';

/**
 * course-progress controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course-progress.course-progress', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest('User is required');
        }

        const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');

        const progress = await strapi.query('api::course-progress.course-progress').findOne({
            where: { user },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                            populate: {
                                preview_icon: true
                            }
                        },
                        lesson_preview: true
                    }
                }, 
                tasks: true
            },
        });

        const formateData = {
            todayComplete: progress.todayComplete,
            todayLesson: {
                id: progress.lesson.id,
                title: progress.lesson.title,
                description: progress.lesson.subtitle,
                reading_time: progress.lesson.reading_time,
                lesson_preview: baseUrl + progress.lesson.lesson_preview.url
            },
            todayTasks: progress.lesson.tasks.map(task => {
                return {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    preview_icon: baseUrl + task.preview_icon.url
                }
            }),
            completedTasks: progress.tasks.map(task => {return task.id})
        }

        return formateData;
    },
}));
