'use strict';

/**
 * practice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');
module.exports = createCoreController('api::practice.practice', ({ strapi }) => ({
    async find(ctx) {
        // Set default query parameters for population
        ctx.query = {
            ...ctx.query,
            populate: {
                sound: { fields: ['id'] },
                icon: true
            }
        };

        // Calling the default core action with super
        const { data, meta } = await super.find(ctx);

        // Transform the data to include only required fields
        const transformedData = data.map(item => {
            const attributes = item.attributes;
            return {
                id: item.id,
                title: attributes.title,
                breathDuration: attributes.breathDuration,
                exhaleDuration: attributes.exhaleDuration,
                breathHold: attributes.breathHold,
                exhaleHold: attributes.exhaleHold,
                duration: attributes.duration,
                icon: baseUrl + attributes.icon.data?.attributes?.url,
                free: attributes.free,
                breath_type: attributes.breath_type,
                exhale_type: attributes.exhale_type,
                sound: attributes.sound && attributes.sound.data.id ? {
                    id: attributes.sound.data.id
                } : null
            };
        });

        // Return the transformed data with meta informationx
        return { data: transformedData, meta };
    },
}));
