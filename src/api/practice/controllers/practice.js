'use strict';

/**
 * practice controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::practice.practice', ({ strapi }) => ({
    async find(ctx) {
        // Set default query parameters for population
        ctx.query = {
            ...ctx.query,
            populate: {
                sound: { fields: ['id'] }
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
                iconText: attributes.iconText,
                sound: attributes.sound.data ? {
                    id: attributes.sound.data.id
                } : null
            };
        });

        // Return the transformed data with meta information
        return { data: transformedData, meta };
    },
}));
