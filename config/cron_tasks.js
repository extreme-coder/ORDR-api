module.exports = {
  '*/1 * * * *': async ({ strapi }) => {
    const servedOrders = await strapi.entityService.findMany("api::order.order", {
      filters: { status: "SERVED" }
    })
    servedOrders.forEach(async order => {
      await strapi.entityService.delete("api::order.order", order.id)
    })
  }
};