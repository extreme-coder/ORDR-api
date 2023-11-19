'use strict';

/**
 * seat service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seat.seat');
