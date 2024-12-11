'use strict';

/**
 * item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::item.item', ({ strapi }) => ({
    async getAllItems(ctx) {
        const items = await strapi.entityService.findMany('api::item.item', {
            populate: { toppings: true }
        })
        const categories = await strapi.entityService.findMany('api::category.category', {
            populate: { toppings: true }
        })
        const acc = {}
        const formattedItems = items.map(item => {
            item.toppings.forEach((topping) => {
                const category = categories.find(category => category.toppings.filter(t => t.id === topping.id).length > 0)
                if (!acc[category.name]) {
                    acc[category.name] = { options: [] }
                }
                acc[category.name].options.push(topping.name)
                console.log(acc)
            })
            const formattedToppings = Object.keys(acc).map(key => {
                return {
                    type: key,
                    ...acc[key]
                }
            })
            return {
                ...item,
                toppings: formattedToppings
            }
        })
        return formattedItems
    }
}));
