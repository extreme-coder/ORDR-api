'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const order = await super.create(ctx);
    if (order.data.attributes.status !== "PRE-EVENT") {
      const { id } = order.data;
      const datedOrder = await strapi.entityService.update('api::order.order', id, {
        data: {
          active_since: new Date()
        }
      }); 
      return datedOrder;
    }
    return order;
  },
}));