'use strict';

/**
 * lesson controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');

module.exports = createCoreController('api::lesson.lesson', ({ strapi }) => ({
    
    async findOne(ctx) {
        const { id } = ctx.params;
        const user = ctx.state.user;

        const lesson = await strapi.db.query('api::lesson.lesson').findOne({
            where: { id },
            populate: {
                tasks: {
                    fields: ['id', 'title', 'description'],
                    populate: {
                        preview_icon: { fields: ['url', 'formats'] } // Подтягиваем иконку для задач
                    }
                },
                benefits: {
                    fields: ['id', 'title', 'description'],
                    populate: {
                        icon: { fields: ['url', 'formats'] } // Подтягиваем иконку для бенефитов
                    }
                },
                lesson_icon: { fields: ['url', 'formats'] },
                lesson_preview: { fields: ['url', 'formats'] },
                sources: { fields: ['*'] },
                content_images: { fields: ['url', ['formats']] },

            }
        });
        if (!lesson) {
            return ctx.notFound('Урок не найден');
        }
        if (!lesson.free) {
            if (!user.premium) {
                return ctx.notFound('not auth!');
            }
        }

        // URL сервера для построения полного пути к изображениям
       

        const formateData = {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            reading_time: lesson.reading_time,
            free: lesson.free,
            icon: baseUrl + lesson.lesson_icon.url,
            preview: baseUrl + lesson.lesson_preview.url,
            tasks: lesson.tasks.map(task => {
                return {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    preview_icon: baseUrl + task.preview_icon.url
                }
            }),
            benefits: lesson.benefits.map(benefit => {
                return {
                    id: benefit.id,
                    title: benefit.title,
                    description: benefit.description,
                    icon: baseUrl + benefit.icon[0].url
                }
            }),
            content: {
                images: lesson.content_images.map(image => {
                    return {
                        url: baseUrl + image.url
                    }
                }),
                text: lesson.content_text,
                sources: lesson.sources.map(source => {
                    return {
                        title: source.title,
                        url: source.url
                    }
                })
            }

        }

        // Вызываем стандартный метод получения записи с `super`



        // Возвращаем преобразованные данные
        return formateData;
    },
    async find(ctx) {
        try {
            const lessons = await strapi.db.query('api::lesson.lesson').findMany({
                populate: {
                    lesson_icon: true
                },
            });
            const formateData = lessons.map(lesson => {
                return {
                    id: lesson.id,
                    title: lesson.title,
                    subtitle: lesson.subtitle,
                    icon: baseUrl + lesson.lesson_icon.url,
                    free: lesson.free
                }
            })
            ctx.send(formateData);
        } catch (e) {
            ctx.throw(500, e);
        }
    }
}));
