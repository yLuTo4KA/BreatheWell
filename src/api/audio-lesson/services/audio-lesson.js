'use strict';

/**
 * audio-lesson service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::audio-lesson.audio-lesson');
