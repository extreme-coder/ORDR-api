// @ts-nocheck
'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const order = await super.create(ctx);
    if (ctx.request.body.data.order_items && ctx.request.body.data.order_items.length > 0) {
      const orderItems = await Promise.all(ctx.request.body.data.order_items.map(async (item) =>
        await strapi.entityService.create('api::order-item.order-item', { 
          data: {
            item: item.item, 
            toppings: item.toppings,
            publishedAt: new Date()
          }
        })
      ))
      await strapi.entityService.update('api::order.order', order.data.id, {
        data: {
          items: orderItems.map(item => item.id)
        }
      });
    }
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

  async update(ctx) {
    const order = await super.update(ctx);
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
  }
}));