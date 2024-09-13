'use strict';

/**
 * sound controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sound.sound', ({ strapi }) => ({
    // Wrap a core action, leaving core logic in place
    async find(ctx) {
        // Set default query parameters for population
        ctx.query = {
            ...ctx.query,
            populate: {
                soundMedia: { fields: ['url', 'name', 'alternativeText'] },
                iconMedia: { fields: ['url', 'name', 'alternativeText'] }
            }
        };

        // Calling the default core action with super
        const { data, meta } = await super.find(ctx);
        const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url'); 

        // Transform the data to match the desired structure
        const transformedData = data.map(item => {
            const attributes = item.attributes;
            return {
                id: item.id,
                title: attributes.title,
                free: attributes.free,
                soundMedia: {
                    id: attributes.soundMedia.data.id,
                    url: baseUrl + attributes.soundMedia.data.attributes.url,
                    name: attributes.soundMedia.data.attributes.name,
                    alternativeText: attributes.soundMedia.data.attributes.alternativeText,
                },
                iconMedia: {
                    id: attributes.iconMedia.data.id,
                    url: baseUrl + attributes.iconMedia.data.attributes.url,
                    name: attributes.iconMedia.data.attributes.name,
                    alternativeText: attributes.iconMedia.data.attributes.alternativeText,
                },
            };
        });

        // Return the transformed data with meta information
        return { data: transformedData, meta };
    },
}));
