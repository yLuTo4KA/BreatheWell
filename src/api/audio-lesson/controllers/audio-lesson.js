'use strict';

/**
 * audio-lesson controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');

module.exports = createCoreController('api::audio-lesson.audio-lesson', ({ strapi }) => ({
    async find(ctx) {
        try {
            const user = ctx.state.user;
            const audioLessons = await strapi.db.query('api::audio-lesson.audio-lesson').findMany({
                populate: {
                    image_preview: true,
                    audio: true
                },
            });
            function getAudio(audio) {
                if(!audio.free) {
                    if(user.premium) {
                        return baseUrl + audio.audio.url;
                    } else {
                        return null;
                    }
                } else {
                    return baseUrl + audio.audio.url
                }
            }
            const formateData = audioLessons.sort((a, b) => a.id - b.id).map(audio => {
                return {
                    id: audio.id,
                    title: audio.title,
                    duration: audio.duration,
                    preview: baseUrl + audio.image_preview.url,
                    audio: getAudio(audio),
                    free: audio.free
                }
            })
            ctx.send(formateData ?? null);
        } catch (e) {
            ctx.throw(500, e);
        }
    },
}));
