'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course.course',  ({ strapi }) => ({
    async find(ctx) {
        // Set default query parameters for population
        ctx.query = {
            ...ctx.query,
            populate: {
              benefits: {
                fields: ['*'], // Включаем все поля бенефитов
                populate: {
                  icon: { fields: ['url', 'formats'] } // Включаем изображение (иконку) для бенефитов
                }
              },
              lessons: {
                fields: ['*'],
                populate: {
                    lesson_preview: {fields: ['url', 'formats']}
                }
              },
              image: { fields: ['url', 'formats'] } // Включаем изображение для курса
            }
          };

          const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url'); 

        // Calling the default core action with super
        const { data, meta } = await super.find(ctx);

        const transformedData = data.map(item => {
            const attributes = item.attributes;
            return {
                id: item.id,
                title: attributes.title,
                description: attributes.description,
                free: attributes.free,
                benefits: attributes.benefits.data.map(benefit => {
                    return {
                        id: benefit.id,
                        title: benefit.attributes.title,
                        description: benefit.attributes.description,
                        icon: baseUrl + benefit.attributes.icon.data[0].attributes.url
                    }
                }),
                image: baseUrl + attributes.image.data.attributes.url,
                lessons: attributes.lessons.data.map(lesson => {
                    const attr = lesson.attributes
                    return {
                        id: lesson.id,
                        title: attr.title,
                        subtitle: attr.subtitle,
                        free: attr.free,
                        lesson_preview: baseUrl + attr.lesson_preview.data.attributes.url
                    }
                })
            };
        });

        // Return the transformed data with meta information
        return { data: transformedData, meta };
    },
}));
